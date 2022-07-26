import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../Actions/actions";
import HomePage from "./HomePage.jsx";

export default function LoadingPage() {
  let loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    loading && dispatch(getCountries());
  });
  return <>{loading ? <h1>Loading...</h1> : <HomePage />}</>;
}
