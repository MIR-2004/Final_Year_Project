import { inngest } from "@/inngest/client";
import { meetingEndedWorker } from "@/workers/meeting/meeting-ended.worker";
import { meetingService } from "@/services/meeting.service";

export const meetingEnded = inngest.createFunction(
  { id: "meeting/ended", triggers: [{ event: "meetings/processing" }] },
  async ({ event, step }) => {
    const { meetingId, transcriptUrl } = event.data;

    // Guard: skip if already completed (handles rare duplicate events)
    const alreadyCompleted = await step.run("check-if-already-completed", async () => {
      const meeting = await meetingService.getMeeting(meetingId);
      return meeting?.status === "completed";
    });

    if (alreadyCompleted) return { skipped: true, reason: "already completed" };

    await step.run("process-meeting-ended", async () => {
      await meetingEndedWorker.handleMeetingEnded(meetingId, transcriptUrl);
    });
  }
);
