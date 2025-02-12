import { TryX } from '../src/TryX';

describe('ErrorHandler', () => {
  let handler: TryX;

  beforeEach(() => {
    handler = new TryX({ retries: 2, logErrors: false });
  });

  it('should return data on successful fetch', async () => {
    const { data, error } = await handler.fetch<{ message: string }>('https://api.success.com');
    expect(data).toEqual({ message: 'Success' });
    expect(error).toBeNull();
  });

  it('should return an error on failed fetch', async () => {
    const { data, error } = await handler.fetch<{ message: string }>('https://api.fail.com');
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Failed to fetch after retries');
  });
});
