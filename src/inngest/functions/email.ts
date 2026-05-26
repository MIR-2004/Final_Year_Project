import { inngest } from "@/inngest/client";
import { sendSummaryWorker } from "@/workers/email/send-summary.worker";

export const emailSummary = inngest.createFunction(
  { id: "email/send-summary", triggers: [{ event: "email/send-summary" }] },
  async ({ event, step }) => {
    const { meetingId } = event.data;

    await step.run("send-summary-email", async () => {
      await sendSummaryWorker.sendToMeetingOwner(meetingId);
    });
  }
);
