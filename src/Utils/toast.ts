import { toast } from "react-toastify";

const toastSuccess = (message: string) => {
  return toast.success(message);
};


export default toastSuccess;


export const toastError=(message:string)=>{
    return toast.error(message);
} 