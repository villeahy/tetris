export default function(state = 0, action) {
  const { type = "", payload } = action;
  switch (type) {
    case "join":
      console.log("room reducer join");
      if (state) return 0;
      return Math.floor(Math.random() * Date.now());
    case "leave":
      console.log("room reducer leave");
      if (payload === state.toString()) return 0;
      return state;
    default:
      console.log("default at room reducer");
      return state;
  }
}
