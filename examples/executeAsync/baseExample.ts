import { TryX } from '../../src/TryX';

// Instantiate the ErrorHandler with custom options
const handler = new TryX({
  timeout: 5000,
  logErrors: 'always',
});

// Mock function to test
const dummy = async () => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello World');
    }, 3000);
  });

  return 'Hello World';
}

(async() => {
  const { data, error } = await handler.executeAsync(dummy);
  if (error) {
    console.error('Error message:', error);
    return;
  }
  console.log('Data:', data);
})();
