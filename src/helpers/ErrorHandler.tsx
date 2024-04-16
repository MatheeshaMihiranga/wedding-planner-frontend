import { toast } from "react-toastify";
import { removeTokens } from "../utils/cacheStorage";

export const errorView = async (err: any) => {  
  toast.error(err?.response?.data?.error || "Something went to wrong");
};


export const successMessage = async (message: any) => {
  toast.success(message);
};

export const warningMessage = async (message: any) => {
  toast.warning(message);
};
