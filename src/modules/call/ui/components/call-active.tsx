"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    CallControls,
    SpeakerLayout,
    PaginatedGridLayout,
    DefaultParticipantViewUI,
    useCallStateHooks,
    useParticipantViewContext,
    GenericMenu,
    GenericMenuButtonItem,
    useMenuContext,
    Icon,
    useCall
} from "@stream-io/video-react-sdk";
import {
    hasAudio,
    hasVideo,
    hasScreenShare,
    hasScreenShareAudio,
    OwnCapability
} from "@stream-io/video-client";
import { LayoutGrid, User, Copy, Check, MessageSquare } from "lucide-react";
import { StreamChat } from "stream-chat";
import { CallChat } from "./call-chat";
import { OpenAIChatbox } from "./openai-chatbox";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import "stream-chat-react/dist/css/v2/index.css";

interface Props {
    onLeave: () => void;
    meetingName: string;
    meetingId: string;
    chatClient: StreamChat;
}

export const CallActive = ({ onLeave, meetingName, meetingId, chatClient }: Props) => {
    const trpc = useTRPC();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const currentUserId = localParticipant?.userId;

    const { data: meeting } = useQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const isOriginalHost = meeting ? meeting.userId === currentUserId : false;
    const isCoHost = meeting?.coHostIds ? meeting.coHostIds.includes(currentUserId ?? "") : false;
    const isHostOrCoHost = isOriginalHost || isCoHost;

    useEffect(() => {
        if (isHostOrCoHost) return;

        const observer = new MutationObserver(() => {
            // Find all buttons or elements that might be menu items inside popovers or dropdowns
            const items = document.querySelectorAll(
                ".str-video__menu-container button, [class*='menu-item'], .str-video__menu-item, [role='menuitem']"
            );

            items.forEach((item) => {
                const el = item as HTMLElement;
                const text = el.textContent?.trim().toLowerCase() || "";

                // Allowed options: "pin", "unpin", "enter fullscreen", "exit fullscreen", "fullscreen"
                // Restricted options (host-only moderation actions):
                const isRestricted =
                    text.includes("block") ||
                    text.includes("kick") ||
                    text.includes("everyone") ||
                    text.includes("allow") ||
                    text.includes("disable") ||
                    text.includes("mute");

                if (isRestricted) {
                    el.style.setProperty("display", "none", "important");
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, [isHostOrCoHost]);

    const CustomParticipantActionsContextMenu = () => {
        const { participant, participantViewElement, videoElement } = useParticipantViewContext();
        const [fullscreenModeOn, setFullscreenModeOn] = useState(!!document.fullscreenElement);
        const call = useCall();
        const { close } = useMenuContext() || {};

        const { pin, sessionId, userId, isLocalParticipant } = participant;

        const hasAudioTrack = hasAudio(participant);
        const hasVideoTrack = hasVideo(participant);
        const hasScreenShareTrack = hasScreenShare(participant);
        const hasScreenShareAudioTrack = hasScreenShareAudio(participant);

        const [isPiP, setIsPiP] = useState(videoElement ? document.pictureInPictureElement === videoElement : false);

        useEffect(() => {
            if (!videoElement) return;
            const handlePiP = () => {
                setIsPiP(document.pictureInPictureElement === videoElement);
            };
            videoElement.addEventListener("enterpictureinpicture", handlePiP);
            videoElement.addEventListener("leavepictureinpicture", handlePiP);
            return () => {
                videoElement.removeEventListener("enterpictureinpicture", handlePiP);
                videoElement.removeEventListener("leavepictureinpicture", handlePiP);
            };
        }, [videoElement]);

        const blockUser = () => {
            call?.blockUser(userId);
            close?.();
        };

        const kickUser = () => {
            call?.kickUser({ user_id: userId });
            close?.();
        };

        const muteAudio = () => {
            call?.muteUser(userId, "audio");
            close?.();
        };

        const muteVideo = () => {
            call?.muteUser(userId, "video");
            close?.();
        };

        const muteScreenShare = () => {
            call?.muteUser(userId, "screenshare");
            close?.();
        };

        const muteScreenShareAudio = () => {
            call?.muteUser(userId, "screenshare_audio");
            close?.();
        };

        const grantPermission = (permission: string) => () => {
            call?.updateUserPermissions({
                user_id: userId,
                grant_permissions: [permission],
            });
            close?.();
        };

        const revokePermission = (permission: string) => () => {
            call?.updateUserPermissions({
                user_id: userId,
                revoke_permissions: [permission],
            });
            close?.();
        };

        const pinForEveryone = () => {
            call?.pinForEveryone({ user_id: userId, session_id: sessionId }).catch((err) => {
                console.error(`Failed to pin participant ${userId}`, err);
            });
            close?.();
        };

        const unpinForEveryone = () => {
            call?.unpinForEveryone({ user_id: userId, session_id: sessionId }).catch((err) => {
                console.error(`Failed to unpin participant ${userId}`, err);
            });
            close?.();
        };

        const toggleParticipantPin = () => {
            if (pin) {
                call?.unpin(sessionId);
            } else {
                call?.pin(sessionId);
            }
            close?.();
        };

        const toggleFullscreenMode = () => {
            if (!fullscreenModeOn) {
                participantViewElement?.requestFullscreen().catch(console.error);
            } else {
                document.exitFullscreen().catch(console.error);
            }
            close?.();
        };

        const togglePictureInPicture = () => {
            if (videoElement && !isPiP) {
                videoElement.requestPictureInPicture().catch(console.error);
            } else {
                document.exitPictureInPicture().catch(console.error);
            }
            close?.();
        };

        useEffect(() => {
            const handleFullscreenChange = () => {
                setFullscreenModeOn(!!document.fullscreenElement);
            };
            document.addEventListener("fullscreenchange", handleFullscreenChange);
            return () => {
                document.removeEventListener("fullscreenchange", handleFullscreenChange);
            };
        }, []);

        // Google Meet protection rules:
        const isTargetSelf = isLocalParticipant || userId === currentUserId;
        const isTargetHost = userId === meeting?.userId;

        // Determine if moderation options are allowed:
        let showModerationOptions = false;
        if (isOriginalHost) {
            // Host can manage everyone except themselves
            showModerationOptions = !isTargetSelf;
        } else if (isCoHost) {
            // Co-host can manage standard users (and other co-hosts), but not host or themselves
            showModerationOptions = !isTargetSelf && !isTargetHost;
        } else {
            // Normal participants see absolutely no moderation options (only pin/fullscreen)
            showModerationOptions = false;
        }

        return (
            <GenericMenu onItemClick={close}>
                <GenericMenuButtonItem
                    onClick={toggleParticipantPin}
                    disabled={pin && !pin.isLocalPin}
                >
                    <Icon icon="pin" />
                    {pin ? "Unpin" : "Pin"}
                </GenericMenuButtonItem>

                {showModerationOptions && (
                    <>
                        <GenericMenuButtonItem
                            onClick={pinForEveryone}
                            disabled={pin && !pin.isLocalPin}
                        >
                            <Icon icon="pin" />
                            Pin for everyone
                        </GenericMenuButtonItem>
                        <GenericMenuButtonItem
                            onClick={unpinForEveryone}
                            disabled={!pin || pin.isLocalPin}
                        >
                            <Icon icon="pin" />
                            Unpin for everyone
                        </GenericMenuButtonItem>

                        <GenericMenuButtonItem onClick={blockUser}>
                            <Icon icon="not-allowed" />
                            Block
                        </GenericMenuButtonItem>
                        <GenericMenuButtonItem onClick={kickUser}>
                            <Icon icon="kick-user" />
                            Kick
                        </GenericMenuButtonItem>

                        {hasVideoTrack && (
                            <GenericMenuButtonItem onClick={muteVideo}>
                                <Icon icon="camera-off-outline" />
                                Turn off video
                            </GenericMenuButtonItem>
                        )}
                        {hasScreenShareTrack && (
                            <GenericMenuButtonItem onClick={muteScreenShare}>
                                <Icon icon="screen-share-off" />
                                Turn off screen share
                            </GenericMenuButtonItem>
                        )}
                        {hasAudioTrack && (
                            <GenericMenuButtonItem onClick={muteAudio}>
                                <Icon icon="no-audio" />
                                Mute audio
                            </GenericMenuButtonItem>
                        )}
                        {hasScreenShareAudioTrack && (
                            <GenericMenuButtonItem onClick={muteScreenShareAudio}>
                                <Icon icon="no-audio" />
                                Mute screen share audio
                            </GenericMenuButtonItem>
                        )}

                        <GenericMenuButtonItem onClick={grantPermission(OwnCapability.SEND_AUDIO)}>
                            Allow audio
                        </GenericMenuButtonItem>
                        <GenericMenuButtonItem onClick={grantPermission(OwnCapability.SEND_VIDEO)}>
                            Allow video
                        </GenericMenuButtonItem>
                        <GenericMenuButtonItem onClick={grantPermission(OwnCapability.SCREENSHARE)}>
                            Allow screen sharing
                        </GenericMenuButtonItem>

                        <GenericMenuButtonItem onClick={revokePermission(OwnCapability.SEND_AUDIO)}>
                            Disable audio
                        </GenericMenuButtonItem>
                        <GenericMenuButtonItem onClick={revokePermission(OwnCapability.SEND_VIDEO)}>
                            Disable video
                        </GenericMenuButtonItem>
                        <GenericMenuButtonItem onClick={revokePermission(OwnCapability.SCREENSHARE)}>
                            Disable screen sharing
                        </GenericMenuButtonItem>
                    </>
                )}

                {participantViewElement && typeof participantViewElement.requestFullscreen !== "undefined" && (
                    <GenericMenuButtonItem onClick={toggleFullscreenMode}>
                        {fullscreenModeOn ? "Leave fullscreen" : "Enter fullscreen"}
                    </GenericMenuButtonItem>
                )}

                {videoElement && document.pictureInPictureEnabled && (
                    <GenericMenuButtonItem onClick={togglePictureInPicture}>
                        {isPiP ? "Leave picture-in-picture" : "Enter picture-in-picture"}
                    </GenericMenuButtonItem>
                )}
            </GenericMenu>
        );
    };

    const CustomParticipantOverlay = (props: React.ComponentProps<typeof DefaultParticipantViewUI>) => {
        return (
            <div className="h-full w-full">
                <DefaultParticipantViewUI
                    {...props}
                    ParticipantActionsContextMenu={CustomParticipantActionsContextMenu}
                />
            </div>
        );
    };

    const [layout, setLayout] = useState<"grid" | "speaker">("grid");
    const [copied, setCopied] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const onCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex h-full text-white relative">
            {/* ── Main call area ── */}
            <div className="flex flex-col flex-1 p-4 gap-4 min-w-0">
                {/* Top bar */}
                <div className="bg-[#101213] rounded-full p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center justify-between p-1 bg-white/10 rounded-full w-fit"
                        >
                            <Image src="/logo.svg" width={22} height={22} alt="Logo" />
                        </Link>
                        <h4 className="text-base font-medium">{meetingName}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onCopyLink}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-full text-sm"
                        >
                            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                            {copied ? "Copied" : "Copy Link"}
                        </button>

                        {/* Chat toggle */}
                        <button
                            onClick={() => setIsChatOpen((prev) => !prev)}
                            className={`flex items-center gap-2 transition px-3 py-1.5 rounded-full text-sm ${isChatOpen
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-white/10 hover:bg-white/20"
                                }`}
                        >
                            <MessageSquare className="size-4" />
                            Chat
                        </button>

                        {/* Layout switcher */}
                        <div className="flex bg-white/10 rounded-full p-1">
                            <button
                                onClick={() => setLayout("grid")}
                                className={`p-1.5 rounded-full transition ${layout === "grid" ? "bg-white/20" : "hover:bg-white/10"
                                    }`}
                            >
                                <LayoutGrid className="size-4" />
                            </button>
                            <button
                                onClick={() => setLayout("speaker")}
                                className={`p-1.5 rounded-full transition ${layout === "speaker" ? "bg-white/20" : "hover:bg-white/10"
                                    }`}
                            >
                                <User className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video area */}
                <div className="flex-1 w-full relative overflow-hidden">
                    {layout === "grid" ? (
                        <PaginatedGridLayout ParticipantViewUI={CustomParticipantOverlay} />
                    ) : (
                        <SpeakerLayout
                            ParticipantViewUISpotlight={CustomParticipantOverlay}
                            ParticipantViewUIBar={CustomParticipantOverlay}
                        />
                    )}
                </div>

                {/* Controls */}
                <div className="bg-[#101213] rounded-full px-4 flex justify-center">
                    <CallControls onLeave={onLeave} />
                </div>
            </div>

            {/* ── Chat sidebar ── */}
            {isChatOpen && (
                <CallChat
                    chatClient={chatClient}
                    meetingId={meetingId}
                    onClose={() => setIsChatOpen(false)}
                />
            )}

            {/* OpenAI Chatbox */}
            <OpenAIChatbox />
        </div>
    );
};