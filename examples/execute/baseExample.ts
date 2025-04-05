import { TryX } from '../../src/TryX';

// Instantiate the ErrorHandler with custom options
const handler = new TryX({
  timeout: 5000,
});

// Mock function to test
const devide = (a: number, b: number) => {
  if(!a || !b){
    throw new Error('Invalid arguments provided');
  }
  if (a === 0 || b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

(() => {
  const { data, error } = handler.execute(() => devide(3, 4));
  if (error) {
    console.error('Error message:', error);
    return;
  }
  console.log('Data:', data);
})();
