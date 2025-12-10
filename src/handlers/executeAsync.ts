import type { Response } from "../types/Response.types";
import { performErrorChecks } from "../utils/performErrorChecks";

export async function executeAsyncHandler<T>(
  fn: (...args: unknown[]) => Promise<T>,
  timeout: number,
): Promise<Response<T>> {
  let timeoutId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(
        new DOMException("Execution aborted due to timeout", "AbortError"),
      );
    }, timeout);
  });

  try {
    const data = await Promise.race([fn(), timeoutPromise]);
    return { data, error: null };
  } catch (error) {
    return performErrorChecks(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
