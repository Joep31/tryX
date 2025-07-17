import { TryX } from '../src';

describe('TryX configuration', () => {
  it('Should be of the correct instance', () => {
    const tx = new TryX({
      timeout: 5000
    });
    expect(tx).toBeInstanceOf(TryX);
  });

  it('Should set the timeout correctly', () => {
    const tx = new TryX({
      timeout: 5000
    });

    expect(tx.getConfig()).toEqual({
      timeout: 5000
    });
  })

  it('Should set the logErrors correctly', () => {
    // @ts-expect-error - No timeout will result in a type error. For testing purposes this is fine.
    const tx = new TryX({
      logErrors: 'always'
    });
    expect(tx.getConfig()).toEqual({
      logErrors: 'always'
    });
  });

  it('Should set the onError callback correctly', () => {
    const mockCallback = jest.fn();
    const tx = new TryX({
      timeout: 5000,
      onError: mockCallback
    });

    expect(tx.getConfig().onError).toBe(mockCallback);
  });
});
