import { TryX } from "../src";

describe("onError callback", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("should call onError callback when an error occurs", async () => {
    const mockCallback = jest.fn();
    const tx = new TryX({
      timeout: 5000,
      onError: mockCallback,
    });

    const mockError = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValue(mockError);

    await tx.fetch("https://api.example.com/test");

    expect(mockCallback).toHaveBeenCalledWith(mockError);
  });
});
