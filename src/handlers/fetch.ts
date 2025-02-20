import fetch from 'cross-fetch';
import { FetchOptions } from '../../types/FetchOptions.types';

export type FetchResponse<T> = { data: T | null; error: Error | null };

export async function fetchHandler<T>(url: string, options: FetchOptions): Promise<FetchResponse<T>> {
  const { timeout, logErrors, ...fetchOptions } = options;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} Reason: ${response.statusText}`);
      }

      const data: T = await response.json();
      return { data, error: null };
    } catch (error) {
      if (logErrors) console.error(`Fetch failed:`, error);      

      if (error instanceof DOMException && error.name === "AbortError") {
        return { data: null, error: new Error("Request timed out") };
      }
          
      if (error instanceof TypeError) {
        return { data: null, error: new Error("Network failure or CORS issue") };
      }
    
      if (error instanceof Error) {
        return { data: null, error };
      }
    
      if (typeof error === "string") {
        return { data: null, error: new Error(error) };
      }
    
      if (typeof error === "object" && error !== null) {
        return { data: null, error: new Error(JSON.stringify(error)) };
      }
      return { data: null, error: new Error('An unknown error occured') };
    }
}
