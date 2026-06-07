import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: (process.env.POLAR_SERVER as "production" | "sandbox") ?? (process.env.NODE_ENV === "production" ? "production" : "sandbox"),
});

export async function getSafeCustomerState(externalId: string) {
    try {
        return await polarClient.customers.getStateExternal({ externalId });
    } catch (error: unknown) {
        const err = error as { name?: string; statusCode?: number; message?: string; body$?: string };
        const isNotFound = 
            err?.name === "ResourceNotFound" || 
            err?.statusCode === 404 || 
            err?.message?.includes("Not found") || 
            err?.body$?.includes("ResourceNotFound");
        
        if (isNotFound) {
            return {
                activeSubscriptions: [],
                grantedBenefits: [],
                activeMeters: [],
            } as unknown as Awaited<ReturnType<typeof polarClient.customers.getStateExternal>>;
        }
        throw error;
    }
}