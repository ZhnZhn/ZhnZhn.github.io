
const _objectIs = Object.is;
const _assign = Object.assign;

const _createStoreImpl = (createState) => {
  let state;

  const listeners = /* @__PURE__ */ new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function"
      ? partial(state)
      : partial;
    if (!_objectIs(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : (typeof nextState !== "object" || nextState === null))
         ? nextState
         : _assign({}, state, nextState);
      listeners.forEach(listener => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const api = {
    getState,
    setState,  
    subscribe
  };
  state = createState(setState, getState, api);
  return api;
};

export const createStore = (
  createState
) => createState
  ? _createStoreImpl(createState)
  : _createStoreImpl;


export const subscribeWithSelector = (fn) => {
  return (set, get, api) => {
    const origSubscribe = api.subscribe;
    api.subscribe = (selector, optListener, options) => {
      let listener = selector;
      if (optListener) {
        const equalityFn = (
          options == null
            ? void 0
            : options.equalityFn
          ) || _objectIs;
        let currentSlice = selector(api.getState());
        listener = (state) => {
          const nextSlice = selector(state);
          if (!equalityFn(currentSlice, nextSlice)) {
            const previousSlice = currentSlice;
            optListener(currentSlice = nextSlice, previousSlice);
          }
        };
        if (options != null && options.fireImmediately) {
          optListener(currentSlice, currentSlice);
        }
      }
      return origSubscribe(listener);
    };

    return fn(set, get, api);
  };
};
