import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { meetings, meetingParticipants } from "@/db/schema";

interface Props {
    params: Promise<{ meetingId: string }>;
}

const page = async ({ params }: Props) => {

    const { meetingId } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/auth/sign-in");
    }

    const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId));

    if (
        existingMeeting &&
        existingMeeting.status !== "completed" &&
        existingMeeting.status !== "cancelled"
    ) {
        try {
            await db.insert(meetingParticipants).values({
                meetingId: meetingId,
                userId: session.user.id,
            }).onConflictDoNothing();
        } catch {
            // Ignore insert error
        }
    }

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CallView meetingId={meetingId} />
        </HydrationBoundary>
    )

}

export default page;