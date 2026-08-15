import { db } from "@/db";
import { eq, count } from "drizzle-orm";
import { meetings } from "@/db/schema";
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

            const [userMeetings] = await db
                .select({
                    count: count(meetings.id),
                })
                .from(meetings)
                .where(eq(meetings.userId, ctx.auth.user.id));

            return {
                meetingCount: userMeetings?.count ?? 0,
            };
        } catch (error) {
            console.error("[Polar API Error] getFreeUsage failed:", error);
            const [userMeetings] = await db
                .select({
                    count: count(meetings.id),
                })
                .from(meetings)
                .where(eq(meetings.userId, ctx.auth.user.id));

            return {
                meetingCount: userMeetings?.count ?? 0,
            };
        }
    })
});