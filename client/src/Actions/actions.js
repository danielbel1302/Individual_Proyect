import axios from "axios";

export function setContry() {
  return { type: "SET_COUNTRY" };
}

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

export function orderCountries(countries) {
  return { type: "GET_COUNTRIES", payload: countries };
}

export function setLoading() {
  return { type: "SET_LOADING" };
}

export function next() {
  return { type: "NEXT" };
}

export function preview() {
  return { type: "PREVIEW" };
}

export function reset() {
  return { type: "RESET" };
}
