import { inngest } from "@/inngest/client";
import { meetingService } from "@/services/meeting.service";

export const meetingStarted = inngest.createFunction(
  { id: "meeting/started", triggers: [{ event: "meetings/started" }] },
  async ({ event, step }) => {
    const { meetingId } = event.data;

    await step.run("update-meeting-status", async () => {
      await meetingService.updateStatus(meetingId, "active");
    });
  }
);
