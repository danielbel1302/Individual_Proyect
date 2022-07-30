import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./CreateActivity.module.css";

export default function CreateActivity() {
  const countries = useSelector((state) => state.countries);
  let [values, setValues] = useState({
    name: "",
    difficulty: 1,
    duration: 0,
    season: "",
  });
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
      : e.target.name === "season" &&
        setValues({ ...values, season: e.target.value });
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
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
