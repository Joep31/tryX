import { performErrorChecks } from "../utils/performErrorChecks";

type ExecutionResponse<T> = { data: T | null; error: Error | null };

export function executeHandler<T>(fn: (...args: any[]) => T): ExecutionResponse<T> {
  try{
    const data: T = fn();
    return { data, error: null };
  } catch(error){
    return performErrorChecks(error);
  }
}