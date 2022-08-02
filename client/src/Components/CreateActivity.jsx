import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./CreateActivity.module.css";

export default function CreateActivity() {
  const countries = useSelector((state) => state.countries);
  const sortCountries = countries.sort(function compareName(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  let [newCountries, setNewCountries] = useState(sortCountries);
  let [values, setValues] = useState({
    name: "",
    difficulty: 1,
    duration: 0,
    season: "",
  });
  let [countryAdd, setCountryAdd] = useState([]);
  let [countrySelect, setCountrySelect] = useState(newCountries[0].name);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleOnChange = (e) => {
    console.log(e.target.value);
    e.target.name === "name"
      ? setValues({ ...values, name: e.target.value })
      : e.target.name === "difficulty"
      ? setValues({ ...values, difficulty: parseInt(e.target.value) })
      : e.target.name === "duration"
      ? setValues({ ...values, duration: e.target.value })
      : e.target.name === "season"
      ? setValues({ ...values, season: e.target.value })
      : e.target.name === "country" && setCountrySelect(e.target.value);
  };
  const onClick = () => {
    console.log("Agregado");
    setCountryAdd([...countryAdd, countrySelect]);
    let newArray = newCountries.filter(
      (countryDelete) => countrySelect !== countryDelete.name
    );
    console.log(newArray);
    setNewCountries(newArray);
    setCountrySelect(newArray[0].name);
  };
  const handleEliminate = (country) => {
    let newArray = countryAdd.filter(
      (countryDelete) => country !== countryDelete
    );
    setCountryAdd(newArray);
    let array = newCountries;
    array.push({ name: country });
    let sortArray = array.sort(function compareName(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    setNewCountries(sortArray);
  };
  return (
    <>
      <h1>CREATE TOURIST ACTIVITY</h1>
      <form onSubmit={handleSubmit}>
        <label className={style.name}>
          Name
          <input type="text" name="name" onChange={handleOnChange} />
        </label>
        <br />
        <label>
          <div className={style.selector}>Difficulty:</div>
          <select name="difficulty" onChange={handleOnChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <br />
        <br />
        <label className={style.name}>
          Duration (Hours)
          <input type="number" name="duration" onChange={handleOnChange} />
        </label>
        <br />
        <label>
          <div>Season</div>
          <div className={style.inLineFlex}>
            <input
              type="radio"
              id="season"
              name="season"
              value="Summer"
              onChange={handleOnChange}
            />
            <label htmlFor="season">Summer</label>
          </div>
          <div className={style.inLineFlex}>
            <input
              type="radio"
              id="season"
              name="season"
              value="Fall"
              onChange={handleOnChange}
            />
            <label htmlFor="season">Fall</label>
          </div>
          <div className={style.inLineFlex}>
            <input
              type="radio"
              id="season"
              name="season"
              value="Winter"
              onChange={handleOnChange}
            />
            <label htmlFor="season">Winter</label>
          </div>
          <div className={style.inLineFlex}>
            <input
              type="radio"
              id="season"
              name="season"
              value="Spring"
              onChange={handleOnChange}
            />
            <label htmlFor="season">Spring</label>
          </div>
        </label>
        <br />
        <br />
        <label>
          <div className={style.selector}>Country:</div>
          <select name="country" onChange={handleOnChange}>
            {newCountries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <button onClick={onClick}>Add</button>
        </label>
        <br />
        <br />
        {countryAdd.length !== 0 &&
          countryAdd.map((country) => (
            <div key={country}>
              <div className={style.add}>
                <div>{country}</div>
                <button onClick={() => handleEliminate(country)}>X</button>
              </div>
              <br />
            </div>
          ))}
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
