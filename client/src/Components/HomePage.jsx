import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./HomePage.module.css";

export default function HomePage() {
  const [country, setCountry] = useState("");
  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const excursions = [
    "Business",
    "Sustainable",
    "Adventure",
    "Rural",
    "Nature",
    "Wine Tourism",
  ];
  console.log(country);
  let countries = useSelector((state) => state.countries);
  const handleOnChange = (e) => {
    setCountry(e.target.value);
  };
  return (
    <>
      <div>HomePage</div>
      <input
        type="search"
        placeholder="Search country..."
        onChange={handleOnChange}
      />
      <button>Search</button>
      <div className={style.cnt}>
        <div className={style.filtro}>
          <span>Filters</span>
          <span>By continent</span>
          {continents.map((continent, index) => {
            return (
              <span>
                {continent}
                <input type="checkbox" value={continent} />
              </span>
            );
          })}
          <span>By type of tourist activity</span>
          {excursions.map((excursion, index) => {
            return (
              <span>
                {excursion}
                <input type="checkbox" value={excursion} />
              </span>
            );
          })}
        </div>
        <div className={style.grid}>
          {countries.map((country) => {
            return (
              <div className={style.card} key={country.id}>
                <img src={country.flagImage} alt="flag" />
                <span>{country.name}</span>
                <span>{country.continent}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
