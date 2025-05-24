/**
 * Configuration options for the error handler.
 */
export interface TryXConfig {
  /**
   * The timeout for each fetch request is mandatory to be set. This timout controls the time the fetch request will wait before aborting in milliseconds.
   * @example timeout: 5000 // 5 seconds
   */
  timeout: number;
  /**
   * Choose when to log errors.
   * @example logErrors: 'always' // Log all errors
   * @example logErrors: 'never' // Never log errors
   * @example logErrors: 'dev-only' // Log errors only in development
   */
  logErrors?: 'always' | 'never' | 'dev-only';
}