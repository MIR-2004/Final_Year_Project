import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { UsersIcon, MailIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  meetingId: string;
}

export const MeetingParticipants = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data: participants, isPending, error } = useQuery(
    trpc.meetings.getParticipants.queryOptions({ meetingId }),
  );

  if (isPending) {
    return (
      <div className="bg-white rounded-lg border p-6 flex flex-col gap-y-4 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-100 rounded" />
      </div>
    );
  }

  // If there's an authorization error or other issue, don't render anything (failsafe)
  if (error || !participants) {
    return null;
  }

  return (
    <Card className="bg-white rounded-lg border shadow-none">
      <CardHeader className="flex flex-row items-center gap-x-2.5 pb-3">
        <UsersIcon className="size-5 text-gray-500" />
        <CardTitle className="text-lg font-medium text-gray-800">
          Meeting Participants ({participants.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-gray-500 text-sm gap-y-2 border border-dashed rounded-lg">
            <UsersIcon className="size-8 text-gray-300" />
            <p>No participants have joined this meeting yet.</p>
          </div>
        ) : (
          <ScrollArea className="max-h-72 pr-2">
            <div className="flex flex-col gap-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-x-3">
                    <GeneratedAvatar
                      variant="initials"
                      seed={participant.name}
                      className="size-9 border border-gray-100 shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-gray-900 leading-snug">
                        {participant.name}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-x-1 mt-0.5">
                        <MailIcon className="size-3 text-gray-400" />
                        {participant.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1.5 text-xs text-gray-400 font-medium">
                    <Clock className="size-3 text-gray-300" />
                    Joined {format(new Date(participant.joinedAt), "PPp")}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
