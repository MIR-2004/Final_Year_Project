import { StreamTheme, useCall, CallingState } from "@stream-io/video-react-sdk";
import { useState, useRef } from "react";
import { StreamChat } from "stream-chat";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
    meetingId: string;
    meetingName: string;
    chatClient: StreamChat;
}

export const CallUI = ({ meetingId, meetingName, chatClient }: Props) => {
    const call = useCall();

    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
    const [isJoining, setIsJoining] = useState(false);
    const isLeavingRef = useRef(false);

    const handleJoin = async () => {
        if (!call || isJoining) return;

        const callingState = call.state.callingState;
        if (callingState === CallingState.JOINED) {
            setShow("call");
            return;
        }
        if (
            callingState === CallingState.JOINING ||
            callingState === CallingState.RECONNECTING ||
            callingState === CallingState.MIGRATING
        ) {
            return;
        }

        setIsJoining(true);
        try {
            await call.join();
            setShow("call");
        } catch (error) {
            console.error("Failed to join call:", error);
            setIsJoining(false);
        }
    };

    const handleLeave = async () => {
        if (!call || isLeavingRef.current) return;
        isLeavingRef.current = true;

        try {
            const state = call.state;
            if (state.callingState === "joined") {
                await call.leave();
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (!errorMessage.includes("already been left")) {
                console.error("Failed to leave call:", error);
            }
        } finally {
            setShow("ended");
        }
    };

    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} isJoining={isJoining} />}
            {show === "call" && (
                <CallActive
                    onLeave={handleLeave}
                    meetingName={meetingName}
                    meetingId={meetingId}
                    chatClient={chatClient}
                />
            )}
            {show === "ended" && <CallEnded />}
        </StreamTheme>
    );
};