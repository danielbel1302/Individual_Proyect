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

export function getCountry(country) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/countries?name=${country}`)
      .then(function (response) {
        dispatch({ type: "GET_COUNTRY", payload: response.data });
      });
  };
}

export function loadingCountry() {
  return { type: "LOADING_COUNTRY" };
}
