import { meetingService } from "@/services/meeting.service";
import { transcriptWorker } from "../ai/transcript.worker";
import { summaryWorker } from "../ai/summary.worker";
import { sendSummaryWorker } from "../email/send-summary.worker";

export const meetingEndedWorker = {
  async handleMeetingEnded(meetingId: string, transcriptUrl: string): Promise<void> {
    // 1. Save transcript URL and set status to processing
    await meetingService.saveTranscriptUrl(meetingId, transcriptUrl);
    await meetingService.updateStatus(meetingId, "processing");

    // 2. Fetch raw transcript
    const response = await fetch(transcriptUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch transcript from ${transcriptUrl}`);
    }
    const rawText = await response.text();

    // 3. Process and enrich transcript
    const enrichedTranscript = await transcriptWorker.parseAndEnrich(rawText);

    // 4. Generate & Save summary
    await summaryWorker.processMeetingSummary(meetingId, enrichedTranscript);

    // 5. Send summary email to owner
    try {
      await sendSummaryWorker.sendToMeetingOwner(meetingId);
    } catch (emailError) {
      console.error(`Failed to send email summary for meeting ${meetingId}:`, emailError);
      // Don't crash the whole worker if email fails, as summary generation succeeded.
    }
  }
};
