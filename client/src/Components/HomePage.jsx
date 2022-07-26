import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountry,
  orderCountries,
  setContry,
  setLoading,
} from "../Actions/actions";
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
  const handleOnClickAll = () => {
    dispatch(setContry());
  };
  const handleOnKeyDown = (e) => {
    e.key === "Enter" && handleOnClick();
  };
  const handleOrder = (e) => {
    let value = 0;
    e.target.value === "upward C" ? (value = 1) : (value = -1);
    const newCountries = countries.sort(function compareName(a, b) {
      if (a.name > b.name) {
        return value;
      }
      if (a.name < b.name) {
        return -value;
      }
      return 0;
    });
    dispatch(setLoading());
    dispatch(orderCountries(newCountries));
  };
  const handleOrderP = (e) => {
    let value = 0;
    e.target.value === "upward P" ? (value = 1) : (value = -1);
    const newCountries = countries.sort(function compareName(a, b) {
      if (a.population > b.population) {
        return value;
      }
      if (a.population < b.population) {
        return -value;
      }
      return 0;
    });
    dispatch(setLoading());
    dispatch(orderCountries(newCountries));
  };
  let [sort, setSort] = useState(false);
  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <>
      <div>HomePage</div>
      <button onClick={handleOnClickAll}>Show all</button>
      <input
        type="search"
        placeholder="Search country..."
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
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
              <button value="Sort" onClick={handleSort}>
                Sort
              </button>
              {sort && (
                <>
                  <button value="upward C" onClick={handleOrder}>
                    Sort countries ascending
                  </button>
                  <button value="falling C" onClick={handleOrder}>
                    Sort Countries Descending
                  </button>
                  <button value="upward P" onClick={handleOrderP}>
                    Sort population ascending
                  </button>
                  <button value="falling P" onClick={handleOrderP}>
                    Sort population Descending
                  </button>
                </>
              )}
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
      <span>Page 0</span>
      <button>Preview</button>
      <button>Next</button>
    </>
  );
}
