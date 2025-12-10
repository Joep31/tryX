import { TryX } from "../src/TryX";

const storeError = (error: Error) => {
  // Here you would log the error to some external service or store it in a database
  console.error("Error logged:", error);
};

const tx = new TryX({
  timeout: 5000,
  onError: storeError,
});

(async () => {
  const brokenFunction = async () => {
    // Simulating a function that throws an error
    throw new Error("This is a simulated error");
  };

  await tx.executeAsync(async () => {
    await brokenFunction();
  });
})();
