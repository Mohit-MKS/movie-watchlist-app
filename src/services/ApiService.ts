import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { Constants } from "./Constants";

const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const loader: HTMLElement | null = document.querySelector('#app-loader');
    if (loader) {
      loader.style.display = 'flex';
    }
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
    const loader: HTMLElement | null = document.querySelector('#app-loader');
    if (loader) {
      loader.style.display = 'none';
    }
    return response;
  },
  (error) => {
    const loader: HTMLElement | null = document.querySelector('#app-loader');
    if (loader) {
      loader.style.display = 'none';
    }
    if (error.response.status === 401) { /* empty */ }
    return Promise.reject(error);
  }
);

const apiService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doRequest: async (method: RequestMethod, url: string, headers?: AxiosHeaders, body?: any,) => {
    return axiosInstance.request({ method: method, url: url, headers: headers, data: body })
  },

};

type RequestMethod = 'post' | 'get' | 'put' | 'delete'

export default apiService;
