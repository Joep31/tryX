import { fetchHandler } from './handlers/fetch';
import { TryXConfig } from '../types/Config.types';
import { ExecutionResponse, FetchResponse } from '../types/Response.types';
import { executeAsyncHandler } from './handlers/executeAsync';
import { executeHandler } from './handlers/execute';

/**
 * An error handler to aid with fetching data.
 * 
 * @param config Configuration options for the error handler.
 * @param config.timeout The timeout for each fetch request is mandatory to be set. This timout controls the time the fetch request will wait before aborting in milliseconds.
 * @exmple 
 * ```ts
 *  const handler = new TryX({
 *    timeout: 5000,
 *  });
 * ```
 */
export class TryX {
  private config: TryXConfig;

  constructor(config: TryXConfig) {
    this.config = config;
  }

  /**
   * Fetch data from a URL.
   * 
   * @param url The URL to fetch data from.
   * @param options The options to pass to the fetch request.
   * @returns A promise that resolves with the data or rejects with an error.
   * @public
   */
  public async fetch<T>(url: string, options?: RequestInit): Promise<FetchResponse<T>> {
    const result = await fetchHandler<T>(url, {...options, ...this.config});
    if(result.error){
      this.logErrors(result.error);
    }
    return result;
  }

  /**
   * Execute a function asynchronously and handle any errors.
   * 
   * @param fn The function to execute asynchronously.
   * @returns A promise that resolves with the data or rejects with an error.
   * @example ```ts
   * executeAsync(() => await uploadToServer())
   * ```
   * @public
   */
  public async executeAsync<T>(fn: (...args: any[]) => Promise<T>): Promise<ExecutionResponse<T>> {
    const result = await executeAsyncHandler<T>(fn, this.config.timeout);
    if(result.error){
      this.logErrors(result.error);
    }
    return result;
  }

  /**
   * Execute a function and handle any errors.
   * 
   * @param fn The function to execute.
   * @example ```ts
   * execute(() => devide(3, 4))
   * ```
   * @returns The data or an error.
   * @public
   */
  public execute<T>(fn: (...args: any[]) => T): ExecutionResponse<T> {
    const result = executeHandler<T>(fn);
    if(result.error){
      this.logErrors(result.error);
    }
    return result;
  }

  /**
   * Logs errors based on the configuration.
   * 
   * @private
   * @param error As the error to log 
   */
  private logErrors(error: Error): void {
    if (this.config.logErrors === 'always') {
      console.error(error);
    }
    if(this.config.logErrors === 'dev-only'){
      if(process.env.NODE_ENV !== 'development') return;
      console.error(error);
    }
  }
}