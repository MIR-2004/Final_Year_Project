"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface JoinMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JoinMeetingDialog = ({ open, onOpenChange }: JoinMeetingDialogProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [meetingId, setMeetingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const idToJoin = meetingId.trim();
      if (!idToJoin) return;

      setIsLoading(true);
      setError("");

      try {
        const meeting = await queryClient.fetchQuery(
          trpc.meetings.getOne.queryOptions({ id: idToJoin })
        );

        if (!meeting) {
          toast.error("Meeting not found");
          setError("Meeting not found. Please check the Meeting ID and try again.");
          return;
        }

        onOpenChange(false);
        router.push(`/meetings/${idToJoin}`);
        setMeetingId("");
      } catch (err: unknown) {
        const msg = (err as Error)?.message || "Meeting not found";
        toast.error(msg);
        setError(msg);
      } finally {
        setIsLoading(false);
      }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setError("");
      setMeetingId("");
    }
    onOpenChange(newOpen);
  };

  return (
        <ResponsiveDialog
          title="Join Meeting"
          description="Enter a meeting ID to join an existing meeting"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="space-y-2">
                  <Input 
                      placeholder="Meeting ID (e.g., 123e4567-e89b...)" 
                      value={meetingId}
                      onChange={(e) => {
                        setMeetingId(e.target.value);
                        if (error) setError("");
                      }}
                      disabled={isLoading}
                      required
                  />
                  {error && (
                    <p className="text-xs text-rose-500 font-medium">{error}</p>
                  )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleOpenChange(false)}
                    disabled={isLoading}
                  >
                      Cancel
                  </Button>
                  <Button type="submit" disabled={!meetingId.trim() || isLoading}>
                      {isLoading && <Loader2 className="size-4 animate-spin mr-2" />}
                      Join
                  </Button>
              </div>
          </form>
        </ResponsiveDialog>
    );
};

