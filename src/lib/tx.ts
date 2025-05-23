import { TryX } from "../";

/**
 * This is a singleton instance of TryX with a default timeout of 5000ms.
 * It can be used for examples and testing purposes.
 * It will not be used in production code.
 * You can create your own instance of TryX with custom options.
 */
export const tx = new TryX({
  timeout: 5000,
})