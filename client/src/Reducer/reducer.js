const INITIAL_STATE = {
  loading: true,
  countries: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
}

export default reducer;
