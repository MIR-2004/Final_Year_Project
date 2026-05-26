import { streamVideo } from "@/lib/stream-video";

export const recordingService = {
  async getRecording(meetingId: string) {
    try {
      const call = streamVideo.video.call("default", meetingId);
      const response = await call.listRecordings();
      return response.recordings?.[0] || null;
    } catch (error) {
      console.error(`Error listing recordings for meeting ${meetingId}:`, error);
      return null;
    }
  }
};
