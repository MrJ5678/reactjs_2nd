function createStore(reducer, initialState) {
  let subscribes = [];
  let initialState = reducer(initialState, {});
  let store = {
    dispatch: action => {
      let newState = reducer(initialState, action);
      if (newState !== initialState) {
        initialState = newState;
        for (const subscriber of subscribes) {
          subscriber();
        }
      }
    },
    getState: () => {
      return initialState;
    },
    subscribe: func => {
      subscribes.push(func);
    }
  };

  return store;
}
