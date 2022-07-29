const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Country, TouristActivity, country_touristActivity } = require("../db");
const { conn } = require("../db");
const { Op } = require("sequelize");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries/:idPais", async (req, res) => {
  const { idPais } = req.params;
  try {
    const country = await Country.findByPk(idPais, {
      include: [
        {
          model: TouristActivity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (country) return res.json(country);
    return res.send("The ID entered does not exist");
  } catch (error) {
    return res.status(404).send("Could not read the countries of the DB");
  }
});

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const country = await Country.findOne({
        where: {
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
      });
      if (country) return res.send(country);
      return res.send("The country you are looking for does not exist");
    } catch (error) {
      return res.status(404).send("Could not read the countries of the DB");
    }
  }
  try {
    const countries = await Country.findAll();
    if (countries.length !== 0) {
      return res.json(countries);
    }
  } catch (error) {
    return res.status(404).send("Could not read the countries of the DB");
  }
  try {
    const response = await axios.get("https://restcountries.com/v3/all");
    const allCountries = response.data;
    for (const property in allCountries) {
      if (allCountries[property].fifa && allCountries[property].capital) {
        try {
          await Country.create({
            id: allCountries[property].fifa,
            name: allCountries[property].name.official,
            flagImage: allCountries[property].flags[0],
            continent: allCountries[property].continents[0],
            capital: allCountries[property].capital[0],
            subregion: allCountries[property].subregion,
            area: allCountries[property].area,
            population: allCountries[property].population,
          });
        } catch (error) {
          return res
            .status(404)
            .send("The countries could not be loaded in the DB");
        }
      }
    }
    try {
      const countries = await Country.findAll();
      return res.json(countries);
    } catch (error) {
      return res.status(404).send("Could not read the countries of the DB");
    }
  } catch (error) {
    return res.status(404).send("Failed to make API request");
  }
});

router.post("/activities", async (req, res) => {
  const { country, name, difficulty, duration, season } = req.body;
  try {
    const idCountry = await Country.findOne({
      attributes: ["id"],
      where: {
        name: {
          [Op.like]: "%" + country + "%",
        },
      },
    });
    try {
      const activity = await TouristActivity.create({
        name,
        difficulty,
        duration,
        season,
      });
      const countryId = idCountry.id;
      try {
        await activity.addCountry(countryId);
        return res.status(201).send("The activity was created successfully");
      } catch (error) {
        return res.status(404).send("Failed to set DB");
      }
    } catch (error) {
      return res
        .status(404)
        .send("Could not read the tourist activity of the DB");
    }
  } catch (error) {
    return res.status(404).send("Could not read the countries of the DB");
  }
});

module.exports = router;
