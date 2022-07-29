import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Country.module.css";
import { resetInfo } from "../Actions/actions";

export default function Card({ info }) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(resetInfo());
  }, [dispatch]);
  return (
    <div className={style.card}>
      <img src={info.flagImage} alt="flag" />
      <span>Name: {info.name}</span>
      <span>Continent: {info.continent}</span>
      <span>ID: {info.id}</span>
      <span>Capital: {info.capital}</span>
      <span>Subregion: {info.subregion}</span>
      <span>
        Area: {info.area} Km<sup>2</sup>
      </span>
      <span>Population: {info.population}</span>
      {info.touristActivities.length !== 0 && <span>Activities:</span>}
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
