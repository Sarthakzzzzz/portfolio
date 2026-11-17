
import nodemailer from "nodemailer";

async function verifySMTP() {
    const user = process.env.GMAIL_USER;
    const password = process.env.GMAIL_APP_PASSWORD;

    if (!user || !password) {
        throw new Error("Missing Gmail environment variables");
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user,
            pass: password,
        },
        connectionTimeout: 10000,
    });

    try {
        await transporter.verify();

        console.log("SMTP connection successful!");
        console.log("Gmail authentication verified.");

    } catch (error) {
        console.error(
            "SMTP verification failed:",
            error instanceof Error ? error.name : "UnknownError"
        );

        process.exitCode = 1;
    } finally {
        transporter.close();
    }
}

verifySMTP();
