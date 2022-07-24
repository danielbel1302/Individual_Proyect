import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountry, loadingCountry } from "../Actions/actions";
import style from "./HomePage.module.css";

export default function HomePage() {
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  let [filter, setFilter] = useState(false);
  let [options, setOptions] = useState({ continent: false, excursions: false });
  let [isChecked, setIsChecked] = useState({
    Africa: false,
    America: false,
    Asia: false,
    Europe: false,
    Oceania: false,
  });
  let countries = useSelector((state) => state.countries);
  let countryFound = useSelector((state) => state.country);
  const continents = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const excursions = [
    "Business",
    "Sustainable",
    "Adventure",
    "Rural",
    "Nature",
    "Wine Tourism",
  ];
  const handleOnClick = () => {
    dispatch(loadingCountry());
    dispatch(getCountry(country));
  };
  const handleOnChange = (e) => {
    setCountry(e.target.value);
  };
  const handleFilter = () => {
    setFilter(!filter);
  };
  const handleOptions = (e) => {
    e.target.value === "continent"
      ? setOptions({
          continent: !options.continent,
          excursions: options.excursions,
        })
      : setOptions({
          continent: options.continent,
          excursions: !options.excursions,
        });
  };
  const handleOnChangeCheck = (e) => {
    e.target.value in isChecked &&
      setIsChecked({
        ...isChecked,
        [e.target.value]: !isChecked[e.target.value],
      });
  };
  let continent = () =>
    continents.filter((continent) => isChecked[continent] === true);
  let newCountries = () =>
    countries.filter((country) => country.continent.includes(continent()[0]));
  return (
    <>
      <div>HomePage</div>
      <input
        type="search"
        placeholder="Search country..."
        onChange={handleOnChange}
      />
      <button onClick={handleOnClick}>Search</button>
      <div className={style.cnt}>
        <div className={style.filtro}>
          <button onClick={handleFilter}>Filters</button>
          {filter && (
            <>
              <button value="continent" onClick={handleOptions}>
                By continent
              </button>
              {options.continent &&
                continents.map((continent, index) => {
                  return (
                    <span key={index}>
                      {continent}
                      <input
                        type="checkbox"
                        id={`checkbox ${index}`}
                        value={continent}
                        onChange={handleOnChangeCheck}
                      />
                    </span>
                  );
                })}
              <button value="excursions" onClick={handleOptions}>
                By type of tourist activity
              </button>
              {options.excursions &&
                excursions.map((excursion, index) => {
                  return (
                    <span key={index}>
                      {excursion}
                      <input type="checkbox" value={excursion} />
                    </span>
                  );
                })}
            </>
          )}
        </div>
        {Object.entries(countryFound).length !== 0 ? (
          <div className={style.grid}>
            <div className={style.card} key={countryFound.id}>
              <img src={countryFound.flagImage} alt="flag" />
              <span>{countryFound.name}</span>
              <span>{countryFound.continent}</span>
            </div>
          </div>
        ) : isChecked[continent()[0]] ? (
          <div className={style.grid}>
            {newCountries().map((country) => {
              return (
                <div className={style.card} key={country.id}>
                  <img src={country.flagImage} alt="flag" />
                  <span>{country.name}</span>
                  <span>{country.continent}</span>
                </div>
              );
            })}
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}
