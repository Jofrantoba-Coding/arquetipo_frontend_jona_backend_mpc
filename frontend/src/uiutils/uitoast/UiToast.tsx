import { toast } from 'react-hot-toast';
import { InterUiToast } from './InterUiToast';


export const showToast = ({ type, message, options }: InterUiToast) => {
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