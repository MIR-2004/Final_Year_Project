"use client";

import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/coll-provider";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LockIcon } from "lucide-react";

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data: session } = authClient.useSession();

  // Use useQuery with refetchInterval to poll meeting status dynamically
  const { data, isPending, error } = useQuery({
    ...trpc.meetings.getOne.queryOptions({ id: meetingId }),
    refetchInterval: (query) => {
      const meeting = query.state.data;
      // If meeting hasn't started and current user is not host, poll every 2 seconds
      if (
        meeting &&
        meeting.status === "upcoming" &&
        session?.user?.id &&
        meeting.userId !== session.user.id
      ) {
        return 2000;
      }
      return false;
    },
  });

  if (isPending || !session || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0D0E]">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState title="Error Loading Meeting" description="Something went wrong." />
      </div>
    );
  }

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0D0E]">
        <ErrorState title="Meeting has ended" description="You can no longer join this meeting." />
      </div>
    );
  }

  const isHost = data.userId === session.user.id;

  // Render waiting screen for normal participants if meeting has not started
  if (data.status === "upcoming" && !isHost) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0B0D0E] text-white p-6">
        <div className="flex flex-col items-center max-w-md text-center gap-y-6 animate-in fade-in zoom-in duration-300">
          <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-bounce shadow-xl">
            <LockIcon className="size-6 text-yellow-500" />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Meeting has not started</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              The host has not joined this meeting yet. As soon as the host starts the meeting, you will automatically be connected.
            </p>
          </div>
          <div className="flex items-center gap-x-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-gray-400">
            <Loader2Icon className="size-3.5 animate-spin text-blue-500" />
            <span>Waiting for host to join...</span>
          </div>
        </div>
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
};