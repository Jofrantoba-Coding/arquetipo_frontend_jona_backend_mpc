/* Librerias externas */
import { ToastOptions, toast } from 'react-hot-toast';

/* Interfaces */
import { InterUiToast } from './InterUiToast';

const showToast = ({ type, message, options }: InterUiToast) => {
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

export default showToast;