const INITIAL_STATE = {
  loading: true,
  countries: [],
  country: {},
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_COUNTRY":
      return {
        ...state,
        country: {},
      };
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    case "GET_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    default:
      return { ...state };
  }
}

export default reducer;
