import { ToastOptions, toast } from 'react-hot-toast';
import { InterUiToast } from './InterUiToast';

export const showToast = ({ type, message, options }: InterUiToast) => {
  const defaultOptions: ToastOptions = {
    position: 'bottom-right',
    ...options
  };

  switch (type) {
    case 'success':
      toast.success(message, defaultOptions);
      break;
    case 'error':
      toast.error(message, defaultOptions);
      break;
    case 'loading':
      toast.loading(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
      break;
  }
};