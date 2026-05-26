import { db } from "@/db";
import { meetings, meetingParticipants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { meetingCache } from "@/cache/meeting.cache";
export const meetingService = {
  async getMeeting(id: string) {
    const cached = await meetingCache.get(id) as typeof meetings.$inferSelect | null;
    if (cached) return cached;

    const [meeting] = await db.select().from(meetings).where(eq(meetings.id, id));
    if (meeting) {
      await meetingCache.set(id, meeting);
    }
    return meeting;
  },

  async updateStatus(id: string, status: "upcoming" | "active" | "completed" | "processing" | "cancelled") {
    const [updated] = await db
      .update(meetings)
      .set({ status, updatedAt: new Date() })
      .where(eq(meetings.id, id))
      .returning();
    
    if (updated) {
      await meetingCache.set(id, updated);
    }
    return updated;
  },

  async addParticipant(meetingId: string, userId: string) {
    return db
      .insert(meetingParticipants)
      .values({ meetingId, userId })
      .onConflictDoNothing();
  },

  async saveSummary(id: string, summary: string) {
    const [updated] = await db
      .update(meetings)
      .set({ summary, status: "completed", updatedAt: new Date() })
      .where(eq(meetings.id, id))
      .returning();

    if (updated) {
      await meetingCache.set(id, updated);
    }
    return updated;
  },

  async saveTranscriptUrl(id: string, transcriptUrl: string) {
    const [updated] = await db
      .update(meetings)
      .set({ transcriptUrl, updatedAt: new Date() })
      .where(eq(meetings.id, id))
      .returning();

    if (updated) {
      await meetingCache.set(id, updated);
    }
    return updated;
  },

  async saveRecordingUrl(id: string, recordingUrl: string) {
    const [updated] = await db
      .update(meetings)
      .set({ recordingUrl, updatedAt: new Date() })
      .where(eq(meetings.id, id))
      .returning();

    if (updated) {
      await meetingCache.set(id, updated);
    }
    return updated;
  }
};
