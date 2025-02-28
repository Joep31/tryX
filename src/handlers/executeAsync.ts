import { ExecutionResponse } from "../../types/Response.types";
import { performErrorChecks } from "../utils/performErrorChecks";

export async function executeAsyncHandler<T>(
  fn: (...args: any[]) => Promise<T>, // Keep user's function unchanged
  timeout: number
): Promise<ExecutionResponse<T>> {
  const controller = new AbortController();
  
  // Create a promise that rejects when the timeout is reached
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error("Execution aborted due to timeout"));
    }, timeout);
    
    // Ensure timeout is cleared if the main function completes in time
    fn().then(() => clearTimeout(timeoutId)).catch(() => clearTimeout(timeoutId));
  });

  try {
    // Run the function and race it against the timeout
    const data = await Promise.race([fn(), timeoutPromise]);
    return { data, error: null };
  } catch (error) {
    return performErrorChecks(error);
  }
}
