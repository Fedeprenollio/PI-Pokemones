const { Router } = require('express');
const { getPokemonesTotal, getPokemonId, getTipos, postPokemon,getPokemones, deletePoke, putPoke } = require('./Controladores');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/pokemons", getPokemones);
router.get("/pokemons/:idPokemon", getPokemonId );

router.get("/types", getTipos);

router.post("/pokemons", postPokemon)

//------- Extra Redme----
router.delete("/pokemons/:id", deletePoke )

router.put("/pokemons/:id", putPoke )



module.exports = router;
