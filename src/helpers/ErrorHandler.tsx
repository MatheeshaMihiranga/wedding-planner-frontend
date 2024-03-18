import { toast } from "react-toastify";
import { removeTokens } from "../utils/cacheStorage";

export const errorView = async (err: any) => {
  if (typeof err !== "string" && err.response.status === 403) {
    removeTokens()
    toast.error(err?.response?.statusText || "Something went to wrong");
  } else {
    toast.error(
      typeof err !== "string"
        ? err?.response?.data?.message || err?.response?.statusText
        : typeof err === "string"
        ? err
        : "Something went to wrong"
    );
  }
};


export const successMessage = async (message: any) => {
  toast.success(message);
};

export const warningMessage = async (message: any) => {
  toast.warning(message);
};
