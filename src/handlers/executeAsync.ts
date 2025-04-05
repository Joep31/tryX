import { ExecutionResponse } from "../../types/Response.types";
import { performErrorChecks } from "../utils/performErrorChecks";

export async function executeAsyncHandler<T>(
  fn: (...args: any[]) => Promise<T>,
  timeout: number
): Promise<ExecutionResponse<T>> {
  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | undefined;

  const taskPromise = fn();

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      controller.abort();
      reject("Execution aborted due to timeout");
    }, timeout);
  });

  try {
    const data = await Promise.race([taskPromise, timeoutPromise]);
    return { data, error: null };
  } catch (error) {
    return performErrorChecks(error);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

