const defaultstate = {
  accessToken: "",
  login: false,
};

function reducer(state = defaultstate, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        login: action.payload,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
