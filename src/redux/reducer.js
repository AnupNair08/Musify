const defaultstate = {
  accessToken: "",
  login: false,
  query: {},
  history: [],
  data: [],
  song: "",
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
    case "SET_DATA":
      return {
        ...state,
        data: action.payload[0],
        art: action.payload[1],
      };
    case "SET_SONG":
      return {
        ...state,
        song: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
