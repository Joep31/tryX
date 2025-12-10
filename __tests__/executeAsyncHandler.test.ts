import { TryX } from "../src";
import { tx } from "../src/lib/tx";

describe("executeAsyncHandler", () => {
  it("Should execute an async function and return the result", async () => {
    const mockFunction = jest.fn(async () => {
      return "Hello world";
    });
    const { data, error } = await tx.executeAsync(mockFunction);

    expect(data).toEqual("Hello world");
    expect(error).toBeNull();
  });

  it("Should return an error if the async function throws", async () => {
    const mockFunction = jest.fn(async () => {
      throw new Error("Oops, something went wrong");
    });
    const { data, error } = await tx.executeAsync(mockFunction);

    expect(data).toBeNull();
    expect(error).toEqual(new Error("Oops, something went wrong"));
  });

  it("Should return an error if the async function times out", async () => {
    jest.useFakeTimers();

    const txShort = new TryX({ timeout: 100 });

    const mockFunction = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    const promise = txShort.executeAsync(mockFunction);

    // Fast-forward time to trigger the timeout before awaiting
    jest.advanceTimersByTime(150);

    const { data, error } = await promise;

    expect(data).toBeNull();
    expect(error).toBeInstanceOf(DOMException);
    expect(error!.name).toEqual("AbortError");

    jest.useRealTimers();
  });
});
