import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { meetings } from "./meeting";

export const transcripts = pgTable("transcripts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  meetingId: text("meeting_id")
    .notNull()
    .references(() => meetings.id, { onDelete: "cascade" }),
  speakerId: text("speaker_id").notNull(),
  text: text("text").notNull(),
  timestamp: integer("timestamp"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
