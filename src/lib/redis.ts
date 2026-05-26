import Redis from "ioredis";

const getRedisUrl = () => {
  return process.env.REDIS_URL || "redis://127.0.0.1:6379";
};

export const redis = new Redis(getRedisUrl(), {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("error", (err) => {
  console.warn("Redis client error:", err.message);
});
