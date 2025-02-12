import { TryX } from '../src/TryX';

// Instantiate the ErrorHandler with custom options
const handler = new TryX({
  timeout: 5000,
});

// Mock API - JSONPlaceholder for testing
const MOCK_API_SUCCESS = 'https://jsonplaceholder.typicode.com/todos/1';

type Todo = {
  id: number,
  title: string,
}

(async () => {
  const { data, error } = await handler.fetch<Todo>(MOCK_API_SUCCESS);
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  console.log('Data:', data);
})();
