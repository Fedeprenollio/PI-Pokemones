const { Router } = require('express');
const { getPokemones, getPokemonId, getTipos, postPokemon } = require('./Controladores');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/pokemons", getPokemones);
router.get("/pokemons/:idPokemon", getPokemonId );

router.get("/types", getTipos);

router.post("/pokemons", postPokemon)


module.exports = router;
