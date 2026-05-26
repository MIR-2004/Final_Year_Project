import { redis } from "@/lib/redis";

const USER_CACHE_PREFIX = "user:";
const CACHE_TTL = 86400; // 24 hours

export const userCache = {
  async get(userId: string): Promise<unknown | null> {
    try {
      const cached = await redis.get(`${USER_CACHE_PREFIX}${userId}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error("Cache read error for user:", error);
      return null;
    }
  },

  async set(userId: string, data: unknown, ttl = CACHE_TTL): Promise<void> {
    try {
      await redis.set(
        `${USER_CACHE_PREFIX}${userId}`,
        JSON.stringify(data),
        "EX",
        ttl
      );
    } catch (error) {
      console.error("Cache write error for user:", error);
    }
  },

  async delete(userId: string): Promise<void> {
    try {
      await redis.del(`${USER_CACHE_PREFIX}${userId}`);
    } catch (error) {
      console.error("Cache delete error for user:", error);
    }
  },
};
