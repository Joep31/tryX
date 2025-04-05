import { TryX } from "../src";
import { tx } from "../src/lib/tx";

describe('fetchHandler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('should return JSON data on success', async () => {
    const mockJson = { data: {message: 'Hello world'} };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockJson,
    });

    const result = await tx.fetch('https://api.example.com/test');

    expect(result.data).toEqual(mockJson);
  });

  it('should return an error on failure', async () => {
    const mockError = new Error('Network error');
    (fetch as jest.Mock).mockRejectedValue(mockError);

    const result = await tx.fetch('https://api.example.com/test');

    expect(result.error).toEqual(mockError);
  });

  it('should handle HTTP errors', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await tx.fetch('https://api.example.com/test');

    expect(result.error).toEqual(new Error('HTTP error! Status: 404 Reason: Not Found'));
  });

  it('should abort and catch timeout errors', async () => {
    const abortError = new DOMException('The user aborted a request.', 'AbortError');

    (global.fetch as jest.Mock).mockImplementation((_url, options) => {
      const signal = options?.signal;

      return new Promise((_resolve, reject) => {
        if (signal?.aborted) {
          reject(abortError);
        } else {
          signal?.addEventListener?.('abort', () => {
            reject(abortError);
          });
        }
      });
    });

    const txShort = new TryX({ timeout: 100 });
    const resultPromise = txShort.fetch('https://api.example.com/slow');

    // Advance time to trigger the abort
    jest.advanceTimersByTime(150);

    const result = await resultPromise;

    expect(result.error).toBeInstanceOf(DOMException);
    expect(result.error!.name).toBe('AbortError');
  });

  it('should forward custom fetch options', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ foo: 'bar' }),
    });
  
    await tx.fetch('https://api.example.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foo: 'bar' }),
    });
  
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foo: 'bar' }),
      })
    );
  });
  
})