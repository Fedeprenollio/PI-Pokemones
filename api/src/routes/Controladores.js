const axios = require("axios");

const {Pokemon, Type} = require('../db')

const getPokemonApi = async  (limit, offset) =>{
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
         limit = 40
        const api = await  axios(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        // console.log(api.data.results)
        const infoApi = await api.data.results.map(p=> axios(p.url));
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
console.log(getPokemonApi())
    // Promise.all([getPokemonApi()], [getPokemonBD()])
    //     .then([A.data.results , B]) = pokemonesTotales

    //     console.log(A.data.results)
    const pokemonesTotales = pokemonesApi.concat(pokemonesBD)

    return pokemonesTotales;
    
}

const getpokemonNameAPI = async(name)=>{
const api = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
const p = await api.data
return {
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

}



const getPokemones = async (req,res, next) => {
    const {name} = req.query
    const pokemones = await getPokemonesTotal()
    
    // const pokemonApiName = 
try {
    if(name) {
       
        const pokeName =  pokemones.filter( p => p.name.toLowerCase() === name.toLowerCase()    );
       
            if(pokeName.length>0) {
                res.status(200).send(pokeName)
            }else {
                const pokeNameApiArray = []
                const pokeNameApi = await getpokemonNameAPI(name)
                pokeNameApiArray.push(pokeNameApi)
                res.status(200).send(pokeNameApiArray)
            }
            // {
               
            //     res.status(404).send("El pokemon no existe")
            // }

    } else{
        res.status(200).send(pokemones)
    }    
} catch (error) {
    if(error.response){
        res.status(error.response.status).send({msg: err.response.status})
    }else if (error.request){
        next(err.request)
    }else{
        next(error)
    }
}
    
};


const getPokemonId = async (req,res)=>{
        const {idPokemon} = req.params;
        const pokemones = await getPokemonesTotal();
        
        try {
            
            const selectPokemonId = await pokemones.find( (p)=>( p.id.toString() === idPokemon.toString()) );
            
            if(selectPokemonId ){
                res.status(200).send(selectPokemonId);

            } else {
                // const pokeNameApiArray = []
                const pokeNameApi = await getpokemonNameAPI(idPokemon)
                // pokeNameApiArray.push(pokeNameApi)
                res.status(200).send(pokeNameApi)
            }

            
        } catch (error) {
            res.status(404).send("Algo anda mal");
           
        }};


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
          
};

const getTipos = async (req,res) =>{
    
    await downloadOfApiType()
    const typesAll = await Type.findAll()
    res.status(200).send(typesAll)

}

const deletePoke = async (req,res, next) => {
    
    const {id} = req.params;
    try {
       // const newId = Number(id.split(/\D/g)[0]);
        
        const poke = await Pokemon.findByPk(id)

        if(poke){
            await poke.destroy()
            res.send("Pokémon eliminado :( ")
        }else {
            res.status(404).send("Pokémon no encontrado")
        }
        

    } catch (error) {
        if(error.response){
            res.status(error.response.status).send({msg: err.response.status})
        }else if (error.request){
            next(err.request)
        }else{
            next(error)
        }
    }



} 




module.exports={
    getPokemonApi,
    getPokemonBD,
    getPokemonesTotal,
    getPokemones,
    getPokemonId,
    postPokemon,
    getTipos,
    deletePoke
    
}