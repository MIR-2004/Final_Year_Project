import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: (process.env.POLAR_SERVER as "production" | "sandbox") ?? (process.env.NODE_ENV === "production" ? "production" : "sandbox"),
});

export async function getSafeCustomerState(externalId: string) {
    try {
        return await polarClient.customers.getStateExternal({ externalId });
    } catch (error: any) {
        const isNotFound = 
            error?.name === "ResourceNotFound" || 
            error?.statusCode === 404 || 
            error?.message?.includes("Not found") || 
            error?.body$?.includes("ResourceNotFound");
        
        if (isNotFound) {
            return {
                activeSubscriptions: [],
                grantedBenefits: [],
                activeMeters: [],
            } as any;
        }
        throw error;
    }
}