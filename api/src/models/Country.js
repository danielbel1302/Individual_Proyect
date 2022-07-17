const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("country", {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
  });
  sequelize.define("touristActivity", {
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      min: 1,
      max: 5,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    season: {
      type: DataTypes.ENUM("Summer", "Fall", "Winter", "Spring"),
    },
  });
};
