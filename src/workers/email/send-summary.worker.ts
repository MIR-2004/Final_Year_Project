import { emailService } from "@/services/email.service";
import { meetingService } from "@/services/meeting.service";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const sendSummaryWorker = {
  async sendToMeetingOwner(meetingId: string): Promise<void> {
    const meeting = await meetingService.getMeeting(meetingId);
    if (!meeting || !meeting.summary) {
      throw new Error(`Meeting or summary not found for ID ${meetingId}`);
    }

    const [owner] = await db.select().from(user).where(eq(user.id, meeting.userId));
    if (!owner || !owner.email) {
      throw new Error(`Owner or email not found for meeting ${meetingId}`);
    }

    await emailService.sendMeetingSummary(owner.email, meeting.name, meeting.summary);
  }
};
