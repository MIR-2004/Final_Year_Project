import { z } from "zod";
import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetingsInsertSchema } from "../../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { toast } from "sonner";
import { GeneratedAvatar } from "@/components/generated-avatar";


interface MeetingFormProps { 
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
    
};

export const MeetingForm = ({ 
     onSuccess,
     onCancel, 
     initialValues 
    }: MeetingFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async(data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );

                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions(),
                );
                onSuccess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message);

            if(error.data?.code === "FORBIDDEN"){
                router.push("/upgrade");
             }
            }, 
        }),
    );

        const updateMeeting= useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async() => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );

                if(initialValues?.id) {
                    await queryClient.invalidateQueries(
                    trpc.meetings.getOne.queryOptions({
                        id: initialValues.id,
                    }),
                    );
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            }, 
        }),
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if ( isEdit ) {
            updateMeeting.mutate({...values, id: initialValues.id});
        } else {
            createMeeting.mutate(values);
        }
    };

    return (
        <Form { ...form}>
            <form className = "space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
             <GeneratedAvatar
             seed={form.watch("name")}
             className="border size-16"
             variant ="botttsNeutral"
             />

            <FormField
             name="name"
             control={form.control}
             render={({ field }) => (
                <FormItem>
                    <FormLabel>Meeting Name</FormLabel>
                    <FormControl>
                        <Input { ...field } placeholder="e.g. Weekly Standup" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

             <div className="flex justify-between gap-x-2">
                {onCancel && (
                <Button 
                    variant="ghost" 
                    disabled={isPending}
                    type="button" 
                    onClick={() => onCancel()}
                    >
                       Cancel
                </Button>
                ) }
                <Button disabled={isPending} type="submit">
                    {isEdit ? "Update": "Create"}
                </Button>
             </div>
            </form>
        </Form>
    );
}