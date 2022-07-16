const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", async(req, res) => {
    const countries = await axios.get('https://restcountries.com/v3/all');
    console.log(countries);
    res.send(countries[0]);
});

module.exports = router;
