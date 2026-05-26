import { inngest } from "@/inngest/client";
import { meetingEndedWorker } from "@/workers/meeting/meeting-ended.worker";

export const meetingEnded = inngest.createFunction(
  { id: "meeting/ended", triggers: [{ event: "meetings/processing" }] },
  async ({ event, step }) => {
    const { meetingId, transcriptUrl } = event.data;

    await step.run("process-meeting-ended", async () => {
      await meetingEndedWorker.handleMeetingEnded(meetingId, transcriptUrl);
    });
  }
);
