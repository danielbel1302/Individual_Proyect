import axios from "axios";

export function getCountries() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/countries")
      .then(function (response) {
        dispatch({ type: "GET_COUNTRIES", payload: response.data });
      });
  };
}

export function setLoading() {
  return { type: "SET_LOADING" };
}
