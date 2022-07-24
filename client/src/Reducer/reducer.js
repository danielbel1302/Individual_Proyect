const INITIAL_STATE = {
  loading: true,
  loadingCountry: false,
  countries: [],
  country: {},
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADING_COUNTRY":
      return {
        ...state,
        loadingCountry: true,
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
        loadingCountry: false,
      };
    default:
      return { ...state };
  }
}

export default reducer;
