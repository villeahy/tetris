export default function(reducer) {
  let state = reducer({ type: "Init" });
  let subscribers = [];
  const middleware = [];

  function getState(partialState = state) {
    if (Array.isArray(partialState)) {
      return partialState.map(getState);
    } else if (typeof partialState === "object") {
      const keys = Object.keys(partialState);
      return keys.reduce((acc, key) => {
        return { ...acc, [key]: getState(partialState[key]) };
      }, {});
    }

    return partialState;
  }

  function use(fn) {
    middleware.push(fn);
  }

  function subscribe(fn) {
    subscribers.push(fn);
    const unsubscribe = () => {
      subscribers = subscribers.filter(s => s !== fn);
    };
    return unsubscribe;
  }
  function notify(state) {
    subscribers.forEach(s => s(state));
  }

  function dispatch(action) {
    middleware.forEach(fn => {
      fn(action, dispatch);
    });
    state = reducer(action, state);
    notify(getState());
  }

  return {
    use,
    dispatch,
    getState,
    subscribe
  };
}
