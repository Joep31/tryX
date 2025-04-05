import { ExecutionResponse } from '../../types/Response.types';
import { performErrorChecks } from '../utils/performErrorChecks';

export function executeHandler<T>(
  fn: (...args: any[]) => T
): ExecutionResponse<T> {
  try {
    const data: T = fn();
    return { data, error: null };
  } catch (error) {
    return performErrorChecks(error);
  }
}
