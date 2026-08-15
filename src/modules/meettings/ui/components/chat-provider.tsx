"use client";

import { authClient } from "@/lib/auth-client";
import { ChatUI } from "./chat-ui";

interface Props {
    meetingId: string;
    meetingName: string;
}

export const ChatProvider = ({ meetingId, meetingName }: Props) => {
   const { data, isPending } = authClient.useSession();

   if(isPending || !data?.user) {
    return (
        <div className="bg-white rounded-lg border p-6 flex flex-col gap-y-4 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-20 bg-gray-100 rounded" />
        </div>
    );
   }

   return (
    <ChatUI
       meetingId={meetingId}
       meetingName={meetingName}
       userId={data.user.id}
       userName={data.user.name}
       userImage={data.user.image ?? ""}
       />
   )
};