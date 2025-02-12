import fetch from 'cross-fetch';
import { FetchOptions } from '../../types/FetchOptions.types';

export type FetchResponse<T> = { data: T | null; error: Error | null };

export async function fetchHandler<T>(url: string, options: FetchOptions): Promise<FetchResponse<T>> {
  const { retries = 0, timeout, logErrors, ...fetchOptions } = options;

  let attempts = 0;
  while (attempts < retries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: T = await response.json();
      return { data, error: null };
    } catch (error) {
      if (logErrors) console.error(`Fetch attempt ${attempts + 1} failed:`, error);
      attempts++;
    }
  }
  
  return { data: null, error: new Error('Failed to fetch after retries') };
}
