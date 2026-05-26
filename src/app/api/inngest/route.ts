import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { meetingEnded } from "@/inngest/functions/meeting-ended";
import { meetingStarted } from "@/inngest/functions/meeting-started";
import { emailSummary } from "@/inngest/functions/email";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [meetingEnded, meetingStarted, emailSummary],
});