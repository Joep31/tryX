import type { FetchOptions } from "../types/FetchOptions.types";
import { performErrorChecks } from "../utils/performErrorChecks";
import type { Response } from "../types/Response.types";

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions,
): Promise<Response<T>> {
  const { timeout, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} Reason: ${response.statusText}`,
      );
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (error) {
    return performErrorChecks(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
