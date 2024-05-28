
import { toast } from 'react-toastify';

export class Toaster {
  readonly success = (message: string) => {
    toast.success(message);
  };

  readonly error = (message: string) => {
    toast.error(message);
  };

  readonly warning = (message: string) => {
    toast.warn(message);
  };

  readonly info = (message: string) => {
    toast.info(message);
  };
}

