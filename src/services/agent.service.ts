import { db } from "@/db";
import { agents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SYSTEM_AGENT_ID, SYSTEM_AGENT_NAME, SYSTEM_AGENT_INSTRUCTIONS } from "@/constants";

export const agentService = {
  async getSystemAgent() {
    return {
      id: SYSTEM_AGENT_ID,
      name: SYSTEM_AGENT_NAME,
      instructions: SYSTEM_AGENT_INSTRUCTIONS,
    };
  },

  async getAgentById(id: string) {
    if (id === SYSTEM_AGENT_ID) {
      return this.getSystemAgent();
    }
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent || null;
  },

  async createAgent(userId: string, name: string, instructions: string) {
    return db
      .insert(agents)
      .values({ userId, name, instructions })
      .returning();
  }
};
