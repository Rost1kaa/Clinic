type RateLimitOptions = {
  max: number;
  windowMs: number;
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function createMemoryRateLimiter({ max, windowMs }: RateLimitOptions) {
  const store = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const current = store.get(key);

      if (!current || current.resetAt <= now) {
        const next = { count: 1, resetAt: now + windowMs };
        store.set(key, next);
        return {
          success: true,
          remaining: max - 1,
          resetAt: next.resetAt,
        };
      }

      current.count += 1;
      store.set(key, current);

      return {
        success: current.count <= max,
        remaining: Math.max(0, max - current.count),
        resetAt: current.resetAt,
      };
    },
  };
}

export const bookingRateLimiter = createMemoryRateLimiter({
  max: 6,
  windowMs: 10 * 60 * 1000,
});
