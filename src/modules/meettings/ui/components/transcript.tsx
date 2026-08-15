import { useState } from "react";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const { data, isLoading } = useQuery(trpc.meetings.getTranscript.queryOptions({ id: meetingId }))

    const [searchQuery, setSearchQuery] = useState("");

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border p-6 flex flex-col gap-y-4 animate-pulse">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-20 bg-gray-100 rounded" />
            </div>
        );
    }

    const filteredData = (data ?? []).filter((item)=>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
            <p className="text-sm font-medium">Transcript</p>
            <div className="relative">
                <Input
                placeholder="Search Transcript"
                className="pl-7 h-9 w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            <ScrollArea>
                <div className="flex flex-col gap-y-4">
                    {filteredData.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            {searchQuery ? "No transcript entries match your search." : "No transcript available for this meeting yet."}
                        </div>
                    ) : (
                        filteredData.map((item) => {
                            return (
                                <div 
                                key={item.start_ts}
                                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
                                >
                                    <div className="flex gap-x-2 items-center">
                                        <Avatar className="size-6">
                                            <AvatarImage src={item.user.image ?? generateAvatarUri({ seed: item.user.name, variant: "initials" })}
                                            alt="User Avatar"
                                            />
                                            </Avatar>
                                            <p className="text-sm font-medium">{item.user.name}</p>
                                            <p className="text-sm text-blue-500 font-medium">
                                                {format(
                                                    new Date(0, 0, 0, 0, 0, 0, item.start_ts),
                                                    "mm:ss"
                                                )}
                                            </p>
                                    </div>
                                    <Highlighter
                                    className="text-sm text-neutral-700"
                                    highlightClassName="bg-yellow-200"
                                    searchWords={[searchQuery]}
                                    autoEscape={true}
                                    textToHighlight={item.text}
                                    />
                                </div>
                            )
                        })
                    )}
                </div>
            </ScrollArea>
        </div>
    )
};
