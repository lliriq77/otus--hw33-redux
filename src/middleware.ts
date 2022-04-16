/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { Middleware } from "./configureStore";

export const logger: Middleware<any, () => void> =
  (store) => (next) => (action) => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
  };
