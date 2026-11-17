
import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export function getTransporter() {
    if (transporter) return transporter;

    const user = process.env.GMAIL_USER;
    const password = process.env.GMAIL_APP_PASSWORD;

    if (!user || !password) {
        throw new Error("SMTP configuration missing");
    }

    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user,
            pass: password,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
    });

    return transporter;
}
