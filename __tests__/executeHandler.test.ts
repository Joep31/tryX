import { tx } from "../src/lib/tx";

describe("executeHandler", () => {
  it("Should execute a function and return the result", () => {
    const mockFunction = jest.fn(() => {
      return "Hello world";
    });
    const { data, error } = tx.execute(mockFunction);

    expect(data).toEqual("Hello world");
    expect(error).toBeNull();
  });

  it("Should return an error if the function throws", () => {
    const mockFunction = jest.fn(() => {
      throw new Error("Oops, something went wrong");
    });
    const { data, error } = tx.execute(mockFunction);

    expect(data).toBeNull();
    expect(error).toEqual(new Error("Oops, something went wrong"));
  });
});
