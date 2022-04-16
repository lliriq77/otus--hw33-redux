/* eslint-disable  @typescript-eslint/no-explicit-any */
export type Store<State = any, Action = { type: string }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action
) => State;

export type Middleware<State, Action> = (
  store: Store<State, Action>
) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
  middlewares?: Middleware<State, Action>[]
) => Store<State, Action>;

export const configureStore: ConfigureStore<any, any> = (
  reducer,
  preloadedState
): Store => {
  let state = preloadedState;
  const sbscrbrs: Set<() => void> = new Set();

  function getState() {
    return state;
  }

  function dispatch(action: any) {
    state = reducer(state, action);
    sbscrbrs.forEach((el) => {
      el();
    });
  }

  function subscribe(newListener: any) {
    sbscrbrs.add(newListener);
    return () => {
      sbscrbrs.delete(newListener);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
};
