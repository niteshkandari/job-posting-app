import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const APP_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

class HttpService {
  private axiosInstance: AxiosInstance | any;

  constructor() {
    this.initAxiosInstance();
  }

  private initAxiosInstance(): void {
    this.axiosInstance = axios.create({
      baseURL: APP_BASE_URL,
      timeout: 10000, // Adjust the timeout as needed
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Fetch the token directly from localStorage
        const authToken = localStorage.getItem("userCredentials")
          ? JSON.parse(localStorage.getItem("userCredentials") || "").token
          : null;

        if (authToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${authToken}`,
          };
        }

        // If the data is an instance of FormData, set multipart content type
        if (config.data instanceof FormData) {
          config.headers = {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          };
        }

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    // Add response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        if (error.response) {
          console.error('Error response:', error.response.data);
          if (error.response.data.message === "Not Authorized") {
            // Handle unauthorized error (e.g., logout or redirect)
          }
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, { params });
  }

  public post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, data);
  }

  public put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(url, data);
  }

  public patch<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, data);
  }

  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url);
  }
}

export default HttpService;
