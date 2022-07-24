import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../Actions/actions";
import HomePage from "./HomePage.jsx";

export default function LoadingPage() {
  let loading = useSelector((state) => state.loading);
  let loadingCountry = useSelector((state) => state.loadingCountry);

  const dispatch = useDispatch();

  useEffect(() => {
    !loadingCountry && loading && dispatch(getCountries());
  });

  return <>{loadingCountry || loading ? <h1>Loading...</h1> : <HomePage />}</>;
}
