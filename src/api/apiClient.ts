import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class apiClient {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  protected post<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config);
  }

  protected put<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config);
  }
}
