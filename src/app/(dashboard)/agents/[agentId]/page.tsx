//import { ScanFace } from "lucide-react"
//import { setupFsCheck } from "next/dist/server/lib/router-utils/filesystem"
//import Page from "../page"
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentIdview, AgentIdViewError, AgentIdViewLoading } from "@/modules/agents/ui/views/agent-id-view";


interface Props {
    params: Promise<{ agentId: string}>
};


// localhost:3000/agents/123

const Page = async ({ params }: Props) => {
    const { agentId } = await params ;

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId}),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
             <Suspense fallback={<AgentIdViewLoading/>}>
             <ErrorBoundary fallback={<AgentIdViewError/>}>
             <AgentIdview agentId={agentId}/>

             </ErrorBoundary>

             </Suspense>
        </HydrationBoundary>
     );
};


export default Page ;