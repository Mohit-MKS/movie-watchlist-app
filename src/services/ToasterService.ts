
import { toast } from 'react-toastify';

export class Toaster {
  static readonly success = (message: string) => {
    toast.success(message);
  };

  static readonly error = (message: string) => {
    toast.error(message);
  };

  static readonly warning = (message: string) => {
    toast.warn(message);
  };

  static readonly info = (message: string) => {
    toast.info(message);
  };

}

