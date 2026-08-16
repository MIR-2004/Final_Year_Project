"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";
import { UpcomingState } from "../components/upcoming-state";
import { authClient } from "@/lib/auth-client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

interface Props {
    meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: session } = authClient.useSession();

    const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting"
    );

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onMutate: () => {
                toast.loading("Deleting meeting...", { id: "delete-meeting-toast" });
            },
            onSuccess: async () => {
                router.push("/meetings");
                toast.success("Meeting deleted successfully", { id: "delete-meeting-toast" });
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions(),
                );
            },
            onError: (err: unknown) => {
                toast.error((err as Error)?.message || "Failed to delete meeting", { id: "delete-meeting-toast" });
            }
        }),
    );

    const handleRemoveMeeting = async () => {
        if (removeMeeting.isPending) return;
        const ok = await confirmRemove();
        if (!ok) return;
        await removeMeeting.mutateAsync({ id: meetingId });
    };

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCompleted = data.status === "completed";
    const isCancelled = data.status === "cancelled";
    const isProcessing = data.status === "processing";
    const isOriginalHost = data.userId === session?.user?.id;
    const isHost = isOriginalHost || (data.coHostIds?.includes(session?.user?.id ?? "") ?? false);

    return (
        <>
            <RemoveConfirmation isLoading={removeMeeting.isPending} />
            <ResponsiveDialog
                open={removeMeeting.isPending}
                onOpenChange={() => {}}
                title="Deleting Meeting"
                description="Please wait while the meeting is being removed..."
            >
                <div className="flex flex-col items-center justify-center py-8 gap-y-4">
                    <div className="size-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center">
                        <Loader2Icon className="size-6 animate-spin text-rose-600" />
                    </div>
                    <div className="flex flex-col items-center gap-y-1 text-center">
                        <p className="text-sm font-semibold text-gray-800">Deleting meeting data...</p>
                        <p className="text-xs text-gray-500">This may take a few seconds.</p>
                    </div>
                </div>
            </ResponsiveDialog>
            <UpdateMeetingDialog
                open={UpdateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data?.name}
                    isHost={isOriginalHost} // Only the original host can edit or remove the meeting
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                    disabled={removeMeeting.isPending}
                />

                {isCompleted && <CompletedState data={data} isHost={isHost} />}
                {isActive && <ActiveState meetingId={meetingId} />}
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isUpcoming && (<UpcomingState
                    meetingId={meetingId}
                    isHost={isHost}
                    isOriginalHost={isOriginalHost}
                />)}
            </div>
        </>
    );
};

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="This may take a few seconds"
        />
    );
};


interface MeetingIdViewErrorProps {
    error?: Error;
}

export const MeetingIdViewError = ({ error }: MeetingIdViewErrorProps) => {
    const isEnded = error?.message?.toLowerCase().includes("ended");
    return (
        <ErrorState
            title={isEnded ? "Meeting has already ended" : "Meeting not found"}
            description={
                isEnded
                    ? "You cannot view details for an ended meeting that you did not join."
                    : "The meeting you are looking for does not exist or may have been deleted."
            }
        />
    );
};