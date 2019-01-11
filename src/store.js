export default function(reducer) {
  const state = reducer();
  return {
    getState: () => ({ ...state }),
    dispatch: action => {
      reducer(action);
    }
  };
}
