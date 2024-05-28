import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { Constants } from "./Constants";

const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return {
      ...config,
      params: { ...config.params, apikey: Constants.API_KEY }
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) { /* empty */ }
    return Promise.reject(error);
  }
);

const apiService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doRequest: async (method: RequestMethod, url: string, body?: any, headers?: AxiosHeaders) => {
    return axiosInstance.request({ method: method, url: url, data: body, headers: headers })
  },

};

type RequestMethod = 'post' | 'get' | 'put' | 'delete'

export default apiService;
