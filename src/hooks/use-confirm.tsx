
import { JSX, useState, useRef }  from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";



export const useConfirm = (
    title: string,
    description: string,
) : [({ isLoading }: { isLoading?: boolean }) => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);
    const isSubmittingRef = useRef(false);

    const confirm = () => {
        isSubmittingRef.current = false;
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const handelClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        promise?.resolve(true);
        handelClose();
    };
    const handleCancel = () => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        promise?.resolve(false);
        handelClose();
    };

    const ConfirmationDialog = ({ isLoading }: { isLoading?: boolean } = {}) => (
        <ResponsiveDialog
            open={promise != null}
            onOpenChange={isLoading ? () => {} : handelClose}
            title={title}
            description={description}
            >      
               <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                <Button
                     onClick={handleCancel}
                     variant="outline"
                     className="w-full lg:w-auto"
                     disabled={isLoading}
                     >
                    Cancel
                </Button>
                <Button
                     onClick={handleConfirm}
                     className="w-full lg:w-auto"
                     disabled={isLoading}
                     >
                    {isLoading ? "Deleting..." : "Confirm"}
                </Button>
                </div>      
        </ResponsiveDialog>
    );
    return [ConfirmationDialog, confirm]
};