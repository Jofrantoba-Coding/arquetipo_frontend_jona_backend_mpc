import { ToastOptions } from "react-hot-toast";

export type InterUiToast = {
    type: 'success' | 'error' | 'loading' | 'default';
    message: string;
    options?: ToastOptions
} 
