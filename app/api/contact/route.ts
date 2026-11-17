
import { NextRequest, NextResponse } from "next/server";
import { contactRateLimit } from "app/lib/rate-limit";
import { contactSchema } from "app/lib/contact-schema";
import { getTransporter } from "app/lib/mailer";

export const runtime = "nodejs";

async function verifyCaptcha(token: string, ip: string) {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        throw new Error("CAPTCHA configuration unavailable");
    }

    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: formData,
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        }
    );

    if (!response.ok) return false;

    const result = await response.json();

    return result.success === true;
}

export async function POST(req: NextRequest) {
    try {
        // 1. Reject oversized requests
        const contentLength = Number(
            req.headers.get("content-length") || 0
        );

        if (contentLength > 12 * 1024) {
            return NextResponse.json(
                { success: false, message: "Request too large." },
                { status: 413 }
            );
        }

        // 2. Identify client IP
        const ip =
            req.headers.get("x-real-ip") ||
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";

        // 3. Persistent rate limiting
        let limit;

        try {
            limit = await contactRateLimit.limit(ip);
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Service temporarily unavailable.",
                },
                { status: 503 }
            );
        }

        if (!limit.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Too many requests. Try again later.",
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(
                            Math.max(
                                1,
                                Math.ceil(
                                    (limit.reset - Date.now()) / 1000
                                )
                            )
                        ),
                    },
                }
            );
        }

        // 4. Parse and validate request
        let body: unknown;

        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid request." },
                { status: 400 }
            );
        }

        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please check your contact form details.",
                },
                { status: 400 }
            );
        }

        const { name, email, subject, message, captchaToken } =
            parsed.data;

        // 5. Verify Cloudflare CAPTCHA
        let captchaValid = false;

        try {
            captchaValid = await verifyCaptcha(captchaToken, ip);
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Verification service unavailable.",
                },
                { status: 503 }
            );
        }

        if (!captchaValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "CAPTCHA verification failed.",
                },
                { status: 403 }
            );
        }

        // 6. Send email using Gmail SMTP
        await getTransporter().sendMail({
            from: {
                name: "Portfolio Contact Form",
                address: process.env.GMAIL_USER!,
            },

            to: process.env.CONTACT_RECEIVER!,

            replyTo: {
                name,
                address: email,
            },

            subject: `Portfolio Contact: ${subject}`,

            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Subject: ${subject}`,
                "",
                "Message:",
                message,
            ].join("\n"),
        });

        // 7. Success response
        return NextResponse.json({
            success: true,
            message: "Your message has been sent successfully!",
        });

    } catch (error) {
        // Log only the error type, never SMTP credentials or raw errors.
        console.error("Contact delivery failed:", {
            errorType:
                error instanceof Error
                    ? error.name
                    : "UnknownError",
        });

        return NextResponse.json(
            {
                success: false,
                message: "Unable to send your message. Please try again later.",
            },
            { status: 500 }
        );
    }
}
