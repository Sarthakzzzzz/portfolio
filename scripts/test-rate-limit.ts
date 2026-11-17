const BASE_URL = "http://localhost:3000";

const payload = {
    name: "Test User",
    email: "test@example.com",
    subject: "Rate limit test",
    message: "This is a rate limit test message.",
    captchaToken: "XXXX", // will fail captcha but rate limit is checked first
};

async function sendRequest(i: number) {
    const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json();
    const retryAfter = res.headers.get("Retry-After");

    const status = Number(res.status);
    const msg = String(data.message).replace(/[\r\n]/g, " ");
    const retry = retryAfter ? ` (Retry-After: ${Number(retryAfter)}s)` : "";
    console.log(`[${i}] ${status} — ${msg}${retry}`);
}

(async () => {
    console.log(`Firing 7 requests (limit is 5 per 15 min)...\n`);
    for (let i = 1; i <= 7; i++) {
        await sendRequest(i);
    }
})();
