/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import type { ApiErrorResponse, ApiResponse } from '@workspace/types';

import { auth } from '@/lib/firebase/config';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: ApiErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private readonly client: AxiosInstance;
  private tokenRefreshPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  private async getAuthToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;

    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise;
    }

    try {
      this.tokenRefreshPromise = user.getIdToken();
      return await this.tokenRefreshPromise;
    } finally {
      this.tokenRefreshPromise = null;
    }
  }

  private setupInterceptors(): void {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor(): void {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const token = await this.getAuthToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Failed to get auth token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private setupResponseInterceptor(): void {
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiErrorResponse>) => {
        const apiError = this.normalizeError(error);

        if (apiError.statusCode === 401 && error.config) {
          return this.handleTokenRefresh(error.config, apiError);
        }

        throw apiError;
      }
    );
  }

  private normalizeError(error: AxiosError<ApiErrorResponse>): ApiError {
    if (!error.response) {
      return new ApiError('Network error. Please check your connection.', 0);
    }

    const { status, data } = error.response;
    const message = data?.message || this.getDefaultMessageForStatus(status);

    return new ApiError(message, status, data);
  }

  private getDefaultMessageForStatus(status: number): string {
    const messages: Record<number, string> = {
      400: 'Bad request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Resource not found',
      500: 'Internal server error',
      502: 'Bad gateway',
      503: 'Service unavailable',
    };

    return messages[status] || 'An unexpected error occurred';
  }

  private async handleTokenRefresh(config: InternalAxiosRequestConfig, originalError: ApiError): Promise<any> {
    try {
      await auth.currentUser?.getIdToken(true);

      const token = await this.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return this.client.request(config);
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);

      throw new ApiError('Your session has expired. Please log in again.', 401, originalError.response);
    }
  }

  async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
