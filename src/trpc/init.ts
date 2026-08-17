import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getSafeCustomerState } from '@/lib/polar';
import { db } from '@/db';
import { meetings, user } from '@/db/schema';
import { count, eq } from 'drizzle-orm';
import { MAX_FREE_MEETINGS } from '@/modules/premium/constants';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "unathorized" });
  }
  return next({
    ctx: {
      ...ctx, auth: session
    }
  });
});

export const premiumProcedure = (entity: "meetings") =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const customer = await getSafeCustomerState(ctx.auth.user.id);

    const [userRecord] = await db
      .select({ totalMeetingsCreated: user.totalMeetingsCreated })
      .from(user)
      .where(eq(user.id, ctx.auth.user.id));

    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));
    const activeCount = userMeetings?.count ?? 0;
    let totalCount = userRecord?.totalMeetingsCreated ?? 0;

    if (totalCount < activeCount) {
      totalCount = activeCount;
      await db
        .update(user)
        .set({ totalMeetingsCreated: activeCount })
        .where(eq(user.id, ctx.auth.user.id));
    }

    const meetingCount = totalCount;
    const isPremium = customer.activeSubscriptions.length > 0;
    const isFreeMeetingLimitReached = meetingCount >= MAX_FREE_MEETINGS;

    const shouldThrowMeetingError =
      entity === "meetings" && isFreeMeetingLimitReached && !isPremium;

    if (shouldThrowMeetingError) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You have reached your free meetings limit" });
    }

    return next({ ctx: { ...ctx, customer } });
  });