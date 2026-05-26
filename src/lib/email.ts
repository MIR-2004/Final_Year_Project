export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

const getFromAddress = () => {
  return process.env.EMAIL_FROM || "onboarding@resend.dev";
};

export async function sendEmail({ to, subject, html }: SendEmailPayload): Promise<void> {
  console.log(`[Email Sent] To: ${to} | Subject: ${subject}`);
  
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: getFromAddress(),
          to,
          subject,
          html,
        }),
      });
      
      const responseData = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        throw new Error(`Resend API returned status ${res.status}: ${JSON.stringify(responseData)}`);
      }
      
      console.log("Email successfully sent via Resend API.");
    } catch (err) {
      console.error("Failed to send email via Resend:", err);
    }
  } else {
    console.log("No RESEND_API_KEY provided; email simulation complete.");
  }
}
