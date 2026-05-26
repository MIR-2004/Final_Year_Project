import { redis } from "@/lib/redis";

const MEETING_CACHE_PREFIX = "meeting:";
const CACHE_TTL = 3600; // 1 hour

export const meetingCache = {
  async get(meetingId: string): Promise<unknown | null> {
    try {
      const cached = await redis.get(`${MEETING_CACHE_PREFIX}${meetingId}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error("Cache read error for meeting:", error);
      return null;
    }
  },

  async set(meetingId: string, data: unknown, ttl = CACHE_TTL): Promise<void> {
    try {
      await redis.set(
        `${MEETING_CACHE_PREFIX}${meetingId}`,
        JSON.stringify(data),
        "EX",
        ttl
      );
    } catch (error) {
      console.error("Cache write error for meeting:", error);
    }
  },

  async delete(meetingId: string): Promise<void> {
    try {
      await redis.del(`${MEETING_CACHE_PREFIX}${meetingId}`);
    } catch (error) {
      console.error("Cache delete error for meeting:", error);
    }
  },
};
