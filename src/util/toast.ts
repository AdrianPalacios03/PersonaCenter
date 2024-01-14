import { toast } from "sonner";

export const sToast = (text: string, error: boolean = false) => {
    error 
    ? toast.error(text, {position: 'bottom-center'})
    : toast.success(text, {position: 'bottom-center'})

}