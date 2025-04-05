import { TryX } from '../../src/TryX';

// Instantiate the ErrorHandler with custom options
const handler = new TryX({
  timeout: 5000,
  logErrors: 'always',
});

// Mock function to trigger the timeout
const dummy = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Completed");
    }, 6000);
  });

  console.log("Completed");
};

(async() => {
  const { data, error } = await handler.executeAsync(dummy);
  if (error) {
    return;
  }
})();
