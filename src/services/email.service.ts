import { sendEmail } from "@/lib/email";

export const emailService = {
  async sendMeetingSummary(to: string, meetingName: string, summary: string) {
    const subject = `Meeting Summary: ${meetingName}`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333;">Meeting Summary: ${meetingName}</h2>
        <p style="color: #666; line-height: 1.5;">Here is the automatically generated summary for your meeting:</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #444;">
          ${summary.replace(/\n/g, "<br/>")}
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">Sent automatically by Meet AI.</p>
      </div>
    `.trim();

    await sendEmail({ to, subject, html });
  }
};
