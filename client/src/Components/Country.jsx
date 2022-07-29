import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryInfo } from "../Actions/actions";
import Card from "./Card.jsx";

export default function Country({ match }) {
  const info = useSelector((state) => state.info);
  const loadingInfo = useSelector((state) => state.loadingInfo);
  let { id } = useParams(match);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountryInfo(id));
  }, [id, dispatch]);
  return <>{loadingInfo ? <h1>Loading...</h1> : <Card info={info} />}</>;
}
