/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { Store, Middleware } from "./configureStore";

export function applyMiddleware(
  store: Store,
  ...middlewares: Middleware<any, any>[]
) {
  let { dispatch } = store;
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });
  return { ...store, dispatch };
}
