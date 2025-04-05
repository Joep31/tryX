/**
 * Perform all checks on an error
 * 
 * @param error as the error caught in the try-catch block
 * @returns no data and a safe to use error instance
 */
export const performErrorChecks = (error: unknown): {data: null, error: Error} => {
  if (error instanceof DOMException && error.name === "AbortError") {
    return { data: null, error: new Error("Request timed out") };
  }
      
  if (error instanceof TypeError) {
    return { data: null, error: new Error("Network failure or CORS issue") };
  }

  if (error instanceof Error) {
    return { data: null, error };
  }

  if (typeof error === "string") {
    return { data: null, error: new Error(error) };
  }

  if (typeof error === "object" && error !== null) {
    return { data: null, error: new Error(JSON.stringify(error)) };
  }
  return { data: null, error: new Error('An unknown error occured') };
}