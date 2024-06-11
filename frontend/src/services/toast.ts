import { toast, ToastOptions } from 'react-hot-toast';

export type ToastType = 'success' | 'error' | 'loading' | 'default';

export const showToast = (type: ToastType, message: string, options?: ToastOptions) => {
  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'loading':
      toast.loading(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};