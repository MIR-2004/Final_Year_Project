"use client";

import { authClient } from "@/lib/auth-client";
import { LoadingState } from "@/components/loading-state";
import { ChatHistory } from "./chat-history";

interface Props {
    meetingId: string;
}

export const ChatHistoryProvider = ({ meetingId }: Props) => {
    const { data, isPending } = authClient.useSession();

    if (isPending || !data?.user) {
        return (
            <div className="bg-white rounded-lg border p-6 flex flex-col gap-y-4 animate-pulse">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-20 bg-gray-100 rounded" />
            </div>
        );
    }

    return (
        <ChatHistory
            meetingId={meetingId}
            userId={data.user.id}
            userName={data.user.name}
            userImage={data.user.image ?? ""}
        />
    );
};
