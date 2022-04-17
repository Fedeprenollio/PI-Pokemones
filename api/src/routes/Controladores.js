const axios = require("axios");

const {Pokemon, Type} = require('../db')

const getPokemonApi = async  (req,res) =>{
    // const URL = `https://pokeapi.co/api/v2/pokemon`


    // const result =  await Promise.all(
    //     data.map(async (id) => {
    //       let response = await axios.get(id.url)
    //       const todo = await response.data
    //       id = {...todo}
    //       return id
    //     }),

    //----------------------
    // const getPokemons = async () => {
    //     const response = await axios.get(
    //       "https://pokeapi.co/api/v2/pokemon?limit=20"
    //     );
    //     console.log(response)
    //     return response;

    //   };

    //   const rest = await getPokemons();
    //   const names = rest.data?.results.map((item) => item.name);

    //   const fullData = await Promise.all(
    //     names.map(async (name) => {
    //       const info = await axios(
    //         `https://pokeapi.co/api/v2/pokemon/${name}`
    //       );

    //       return {
    //         name: info.data.name,
    //         img: `https://play.pokemonshowdown.com/sprites/xyani/${info.data.name}.gif`,
    //         tipos: info.data.types.map((type) => type.type.name),
    //         hp: info.data.stats[0].base_stat,
    //         attack: info.data.stats[1].base_stat,
    //         defense: info.data.stats[2].base_stat,
    //         speed: info.data.stats[5].base_stat,
    //         id: info.data.id
    //       };
    //     })
    //   );
      
    //   res.send(fullData)
      //---------

        const api = await  axios(`https://pokeapi.co/api/v2/pokemon?limit=10`);
        // console.log(api.data.results)
        const infoApi = await api.data.results.map(p=> axios(p.url));
        const infoPoke = await axios.all(infoApi);
           
        const pokemon = infoPoke.map(p=>p.data);
        // console.log(pokemon)
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
                image: p.sprites.other["official-artwork"].front_default,           //home.front_shiny,   //["algo-medio"]
                types: p.types.map(t=>t.type.name)
                
            }
        })
//console.log(pokeDetail)
             return pokeDetail


}

const getPokemonBD = async (req,res)=>{

    const pokemonesBD = await Pokemon.findAll({
         
       // raw: true,
        
        include: 
        {          
            model: Type,
            attributes: ['name'],
            through: { attributes: [] }
         } 
    })

//     console.log(pokemonesBD)
// //console.log(pokemonesBD)
//     res.send(pokemonesBD)
    return pokemonesBD;
} 

const getPokemonesTotal = async()=>{
    const pokemonesApi = await getPokemonApi();
    const pokemonesBD  = await getPokemonBD();

    // Promise.all([getPokemonApi()], [getPokemonBD()])
    //     .then([A.data.results , B]) = pokemonesTotales

    //     console.log(A.data.results)
    const pokemonesTotales = pokemonesApi.concat(pokemonesBD)

    return pokemonesTotales;
    
}

const getPokemones = async (req,res) => {
    const {name} = req.query
    const pokemones = await getPokemonesTotal()

    if(name) {
       
        const pokeName = await pokemones.filter( p => p.name.toLowerCase() === name.toLowerCase()    );
       
            if(pokeName) {
                res.status(200).send(pokeName)
            }else {
                res.status(404).send("El pokemon no existe")
            }

    } else{
        res.status(200).send(pokemones)
    }
   
    
}


const getPokemonId = async (req,res)=>{
        const {idPokemon} = req.params;
        const pokemones = await getPokemonesTotal();
        
        try {
            const selectPokemonId = await pokemones.find( (p)=>( p.id.toString() === idPokemon.toString()) );
            res.status(200).send(selectPokemonId);
            
        } catch (error) {
            res.status(404).send("Algo anda mal");
            
        }

};


const postPokemon = async (req,res) =>{
    

    const {name, hp, attack, defense, speed, height, weight, image , createInBD, types} = req.body;
   
    //como para obtengo todos los tipos de antemano?
        
    try {
      
        const newPokemon =  await Pokemon.create({ name, hp, attack, defense, speed, height, weight, createInBD , image})  ;
        

   await downloadOfApiType()

       const tipoBD = await Type.findAll({
           
        where:{ 
            name: types } 

    }); 

     
      console.log(  tipoBD)

   await newPokemon.addType(tipoBD   )
    //
     //console.log(newPokemon)
    res.send("newPokemon listo")
} catch (error) {
    res.send("error al crear")
}

};

const downloadOfApiType = async ()=>{
    const api = await axios.get(`https://pokeapi.co/api/v2/type`)
    const tiposApi = await api.data.results.map( t => t.name)

    tiposApi.forEach( t => { 
 
        Type.findOrCreate({
            where:{
                name: t
            }
        })
    })
   
        
}


const getTipos = async (req,res) =>{
    // const api = await axios.get(`https://pokeapi.co/api/v2/type`)
    // const tiposApi = await api.data.results.map( t => t.name)

    // tiposApi.forEach( t => {
    //     Type.findOrCreate({
    //         where: {
    //             name:t
    //         }
    //     })
    // })
   
    // const tiposAll = await Type.findAll();
    // res.send(tiposAll)


    await downloadOfApiType()
    const typesAll = await Type.findAll()
    res.status(200).send(typesAll)

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