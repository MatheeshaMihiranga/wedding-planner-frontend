import axios from "axios";
import { API_URL } from "../config/constants";

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const gateAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

gateAxios.interceptors.request.use(async (config: any) => {
  const token = await localStorage.getItem("token");
  if (token) {
    try {
      config.headers.Authorization = `${token}`;
      return config;
    } catch (err) {
      await localStorage.removeItem("token");
    }
  }
});

export { gateAxios,authAxios };
