import { db } from "@/db";
import { eq, count } from "drizzle-orm";
import { meetings, user } from "@/db/schema";
import { polarClient, getSafeCustomerState } from "@/lib/polar";
import {
    createTRPCRouter,
    protectedProcedure,
} from "@/trpc/init";

export const premiumRouter = createTRPCRouter({
    getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
        try {
            const customer = await getSafeCustomerState(ctx.auth.user.id);

            const subscription = customer.activeSubscriptions?.[0];
            if (!subscription) {
                return null;
            }

            const product = await polarClient.products.get({
                id: subscription.productId,
            });
            return product;
        } catch (error) {
            console.error("[Polar API Error] getCurrentSubscription failed:", error);
            return null;
        }
    }),
    getProducts: protectedProcedure.query(async () => {
        try {
            const products = await polarClient.products.list({
                isArchived: false,
                isRecurring: true,
                sorting: ["price_amount"],
            });

            return products?.result?.items ?? [];
        } catch (error) {
            console.error("[Polar API Error] getProducts failed:", error);
            return [];
        }
    }),
    getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
        try {
            const customer = await getSafeCustomerState(ctx.auth.user.id);

            const subscription = customer.activeSubscriptions?.[0];
            if (subscription) {
                return null;
            }

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

            return {
                meetingCount: totalCount,
            };
        } catch (error) {
            console.error("[Polar API Error] getFreeUsage failed:", error);

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

            return {
                meetingCount: totalCount,
            };
        }
    })
});