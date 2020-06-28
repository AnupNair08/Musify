const defaultstate = {
  accessToken: "",
  login: false,
  query: {},
  history: [],
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
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
        history: state.history.concat(state.query),
      };
    default:
      return state;
  }
}
export default reducer;
