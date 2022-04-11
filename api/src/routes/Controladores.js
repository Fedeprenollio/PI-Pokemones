const axios = require("axios");

const {Pokemon, Tipo} = require('../db')

const getPokemonApi = async (req,res) =>{
    // const URL = `https://pokeapi.co/api/v2/pokemon`

    // const result =  await Promise.all(
    //     data.map(async (id) => {
    //       let response = await axios.get(id.url)
    //       const todo = await response.data
    //       id = {...todo}
    //       return id
    //     }),
    
   
        const api = await  axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);
        const infoApi = await api.data.results.map(p=> axios.get(p.url));
        const infoPoke = await axios.all(infoApi);
    
        const pokemon = infoPoke.map(p=>p.data);
        const pokeDetail=pokemon.map(p=>{
            return{
                id: p.id,
                name: p.name,
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight,
                image: p.sprites.other.home.front_shiny,
                types: p.types.map(t=>t.type.name)
                
            }
        })

             return pokeDetail
}

const getPokemonBD = async ()=>{

    const pokemonesBD = await Pokemon.findAll({
        atributes: ['id', 'name', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'image' ], 
        include:{
            model: Tipo,
            atributes: ['name'],
            throw: { atributes: [] }
        }
    })
    return pokemonesBD;
}

const getPokemonesTotal = async()=>{
    const pokemonesApi = await getPokemonApi();
    const pokemonesBD  = await getPokemonBD();
    const pokemonesTotales = pokemonesApi.concat(pokemonesBD)

    return pokemonesTotales;
    
}

const getPokemones = async (req,res) => {
    const {name} = req.query
    const pokemones = await getPokemonesTotal()

    if(name) {
        const pokeName = await pokemones.find( p => p.name.toLowerCase() === name.toLowerCase()    );
            if(pokeName) {
                res.send(pokeName)
            }else {
                res.status(404).send("El pokemon no existe")
            }

    } else{
        res.send(pokemones)
    }


    
    
}


const getPokemonId = async (req,res)=>{
        const {idPokemon} = req.params;
        const pokemones = await getPokemonesTotal();
        
        try {
            const selectPokemonId = await pokemones.find( (p)=>( p.id === parseInt(idPokemon)) );
            res.send(selectPokemonId);
            
        } catch (error) {
            res.status(404).send("Algo anda mal");
            
        }

};

// const getPokemonName = async (req,res) =>{
//     const {name} = req.query;

//     const pokemones = await getPokemonesTotal();

//     if(name) {
//         const pokeName = await pokemones.find( p => p.name === name    );
//         res.send(pokeName)
        
//     } else {

//         res.status(404).send("El nombre no existe")
//     }
// }

const postPokemon = async (req,res) =>{

    const {name, hp, attack, defense, speed, height, weight, types, createInBD} = req.body;


    const newPokemon =  await Pokemon.create({ name, hp, attack, defense, speed, height, weight, createInBD })  ;

    const tipoBD = await Tipo.findAll({
        where:{
            name: types
        }
    });

    newPokemon.addTipos(tipoBD)

    res.send("newPokemon listo")
    
};

const getTipos = async (req,res) =>{
    const api = await axios.get(`https://pokeapi.co/api/v2/type`)
    const tiposApi = await api.data.results.map( t => t.name)

    tiposApi.forEach( t => {
        Tipo.findOrCreate({
            where: {
                name:t
            }
        })
    })
   
    const tiposAll = await Tipo.findAll();
    res.send(tiposAll)

}


module.exports={
    getPokemonApi,
    getPokemonBD,
    getPokemonesTotal,
    getPokemones,
    getPokemonId,
    postPokemon,
    getTipos
    
}