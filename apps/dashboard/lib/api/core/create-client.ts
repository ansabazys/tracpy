import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./token";

export const createApiClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};
