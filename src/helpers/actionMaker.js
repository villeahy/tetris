const actionMaker = () => {
  let timeout;
  return (action, thisActionMaker) => dispatch => {
    if (
      action.type === "ArrowDown" ||
      action.type === "Space" ||
      action.type === "Init"
    ) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(thisActionMaker({ type: "ArrowDown" }, thisActionMaker));
      }, 750);
    } else if (action.type === "GameOver") {
      console.log("timeout cleared");
      clearTimeout(timeout);
    }

    dispatch(action);
  };
};
export { actionMaker };
