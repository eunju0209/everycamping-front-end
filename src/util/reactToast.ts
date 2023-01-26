import { toast } from 'react-toastify';

export const toastSuccess = (text : string) => {
  return toast.success(text, {
          position: 'top-center',
          autoClose: 2000,
          theme: 'colored',
        });
}

export const toastWarn = (text : string) => {
  return toast.warn(text, {
          position: 'top-center',
          autoClose: 2000,
          theme: 'colored',
        });
}

export const toastError = (text : string) => {
  return toast.error(text, {
          position: 'top-center',
          autoClose: 2000,
          theme: 'colored',
        });
}