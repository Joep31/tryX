import { TryX } from "../src/TryX";

// Instantiate the ErrorHandler with custom options
const tx = new TryX({
  timeout: 5000,
});

// Mock API - JSONPlaceholder for testing
const MOCK_API_SUCCESS = "https://jsonplaceholder.typicode.com/users/1";

(async () => {
  const { data, error } = await tx.fetch(MOCK_API_SUCCESS);
  if (error) {
    console.error("Error message:", error);
    return;
  }
  console.info("Data:", data);
})();
