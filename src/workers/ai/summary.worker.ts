import { aiService } from "@/services/ai.service";
import { meetingService } from "@/services/meeting.service";

export const summaryWorker = {
  async processMeetingSummary(meetingId: string, transcriptWithSpeakers: unknown[]): Promise<string> {
    const summary = await aiService.generateSummary(transcriptWithSpeakers);
    await meetingService.saveSummary(meetingId, summary);
    return summary;
  }
};
