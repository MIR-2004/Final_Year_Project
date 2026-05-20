
import {  createTRPCRouter } from '../init';
import { meetingssRouter } from '@/modules/meettings/server/procedures';
import { premiumRouter } from '@/modules/premium/server/procedures';

export const appRouter = createTRPCRouter({
  meetings: meetingssRouter,
  premium: premiumRouter,
});

export type AppRouter = typeof appRouter;