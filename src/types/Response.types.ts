/**
 * @deprecated Use `Response<T>` instead
 */
export type FetchResponse<T> = {
  data: T | null;
  error: Error | DOMException | null;
};

/**
 * @deprecated Use `Response<T>` instead
 */
export type ExecutionResponse<T> = {
  data: T | null;
  error: Error | DOMException | null;
};

export type SuccessResponse<T> = { data: T; error: null };
export type ErrorResponse = { data: null; error: Error | DOMException };

export type Response<T> = SuccessResponse<T> | ErrorResponse;
