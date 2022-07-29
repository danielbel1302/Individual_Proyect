const INITIAL_STATE = {
  loading: true,
  start: 0,
  end: 9,
  countries: [],
  country: {},
  info: {},
  loadingInfo: true,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_COUNTRY_INFO":
      return {
        ...state,
        info: action.payload,
        loadingInfo: false,
      };
    case "RESET_INFO":
      return {
        ...state,
        info: {},
        loadingInfo: true,
      };
    case "RESET":
      return {
        ...state,
        start: 0,
        end: 9,
      };
    case "NEXT":
      return {
        ...state,
        start: state.end,
        end: state.end + 10,
        loading: false,
      };
    case "PREVIEW":
      if (state.start === 9)
        return {
          ...state,
          start: state.start - 9,
          end: state.end - 10,
          loading: false,
        };
      return {
        ...state,
        start: state.start - 10,
        end: state.end - 10,
        loading: false,
      };
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
