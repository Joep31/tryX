/**
 * Configuration options for the error handler.
 */
export interface TryXConfig {
  retries?: number;
  timeout: number;
  logErrors?: 'always' | 'never' | 'dev-only';
}