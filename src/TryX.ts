import { fetchHandler } from './handlers/fetch';
import { TryXConfig } from '../types/Config.types';
import { FetchOptions } from '../types/FetchOptions.types';

export type FetchResponse<T> = { data: T | null; error: Error | null };

/**
 * An error handler to aid with fetching data.
 * 
 * @param config Configuration options for the error handler.
 * @param config.timeout The timeout for each fetch request is mandatory to be set. This timout controls the time the fetch request will wait before aborting in milliseconds.
 */
export class TryX {
  private config: TryXConfig;

  constructor(config: TryXConfig = {
    timeout: 0,
  }) {
    this.config = {
      // Default configuration options
      retries: config.retries ?? 0,
      // Timeout is mandatory
      timeout: config.timeout,
      // Default to not log errors as the user can enable it
      logErrors: config.logErrors ?? 'never',
    };
  }

  fetch<T>(url: string, options?: FetchOptions): Promise<FetchResponse<T>> {
    return fetchHandler<T>(url, {...options, ...this.config});
  }
}