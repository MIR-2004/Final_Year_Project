import { polarClient } from "@polar-sh/better-auth/client"
import { createAuthClient } from "better-auth/react"

export interface PolarClientMethods {
    checkout: (options: { products: string[] }) => Promise<{ url: string; redirect: boolean }>;
    portal: (options?: { redirect?: boolean }) => Promise<{ url: string; redirect: boolean }>;
    customer: {
        portal: (options?: { redirect?: boolean }) => Promise<{ url: string; redirect: boolean }>;
    };
}

export const authClient = createAuthClient({
    plugins: [polarClient() as any]
}) as ReturnType<typeof createAuthClient> & PolarClientMethods;