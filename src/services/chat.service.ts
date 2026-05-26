import { streamChat } from "@/lib/stream-chat";
import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateAvatarUri } from "@/lib/avatar";

export const chatService = {
  async sendMessageToStream(channelId: string, senderId: string, senderName: string, text: string) {
    const avatarUrl = generateAvatarUri({
      seed: senderName,
      variant: "botttsNeutral",
    });

    await streamChat.upsertUser({
      id: senderId,
      name: senderName,
      image: avatarUrl,
    });

    const channel = streamChat.channel("messaging", channelId);
    await channel.watch();

    return channel.sendMessage({
      text,
      user: {
        id: senderId,
        name: senderName,
        image: avatarUrl,
      },
    });
  },

  async saveMessageToDb(meetingId: string, senderId: string, text: string) {
    return db.insert(chatMessages).values({ meetingId, senderId, text }).returning();
  },

  async getMessagesFromDb(meetingId: string) {
    return db.select().from(chatMessages).where(eq(chatMessages.meetingId, meetingId));
  }
};
