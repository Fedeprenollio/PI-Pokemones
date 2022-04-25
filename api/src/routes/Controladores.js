const axios = require("axios");

const {Pokemon, Type} = require('../db')

const getPokemonApi =  async  (limit, offset) =>{
    // const promises = [];
    // for (let i = 1; i <= 3; i++) {
    //   const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    //   promises.push( await axios(url).then(res => res.data));
    // }

    // Promise.all(promises).then(results => {
    //     const pokemon = results.map(data => ({
    //         id: data.id,
    //         name: data.name,
    //         hp: data.stats[0].base_stat,
    //         attack: data.stats[1].base_stat,
    //         defense: data.stats[2].base_stat,
    //         speed: data.stats[5].base_stat,
    //         height: data.height,
    //         weight: data.weight,
    //         image: data.sprites.other["official-artwork"].front_default,           //home.front_shiny,   //["algo-medio"]
    //         types: data.types.map(t=>t.type.name)
    //     }));
    //        console.log(pokemon)
    //     return pokemon;
    // }
  
    // )
    //   .catch((reason) => {
    //     
    //   })
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

const getPokemonBD = async  ()=>{

    const pokemonesBD = await Pokemon.findAll({
         include: 
        {          
            model: Type,
            attributes: ['name'],
            through: { attributes: [] }
         } 
    })
    return pokemonesBD;
} 

const getPokemonesTotal = async()=>{
   // const datos = getPokemonApi().then(datos => datos);
    const pokemonesApi = await getPokemonApi();
    const pokemonesBD  = await getPokemonBD();
// console.log(datos)
    // Promise.all([getPokemonApi()], [getPokemonBD()])
    //     .then([A.data.results , B]) = pokemonesTotales

    //     console.log(A.data.results)
    const pokemonesTotales = pokemonesApi.concat(pokemonesBD)

    return pokemonesTotales;
    
    
};

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
       
        try {
            const pokeName =  pokemones.filter( p => p.name.toLowerCase() === name.toLowerCase()    );
       
            if(pokeName.length>0) {
                res.status(200).send(pokeName)
            }else {
                const pokeNameApiArray = []
                const pokeNameApi = await getpokemonNameAPI(name)
                pokeNameApiArray.push(pokeNameApi)
                res.status(200).send(pokeNameApiArray)
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
        const pokemones = await getPokemonBD();
        
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


const postPokemon = async (req,res, next) =>{
    const {name, hp, attack, defense, speed, height, weight, image , createInBD, types} = req.body;
           
    try {
        const newPokemon =  await Pokemon.create({ name, hp, attack, defense, speed, height, weight, createInBD , image})  ;
        
        //PROBANDO SI ES NECESARIO OBTENER LOS TIPOS
   await downloadOfApiType()
       const tipoBD = await Type.findAll({
           where:{ 
                name: types } 
    }); 
       await newPokemon.addType(tipoBD   )
       res.send("newPokemon creato correctamente")

} catch (error) {
    if(error.response){
        res.status(error.response.status).send({msg: err.response.status})
    }else if (error.request){
        next(err.request)
    }else{
        next(error)
    }
}};

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
   try {
            await downloadOfApiType()
            const typesAll = await Type.findAll()
            res.status(200).send(typesAll)
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

//-----EXTRAS----


const deletePoke = async (req,res, next) => {
    
    const {id} = req.params;
    try {
               
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


const putPoke = async (req, res, next) =>{

    const {id} = req.params;
    try {
       
        
        const poke = await Pokemon.findByPk(id)

        if(poke){
          
            const {
                name,
                hp,
                attack,
                defense,
                speed,
                img,
                types,
              } = req.body;

            await poke.update({
                name,
                hp,
                attack,
                defense,
                speed,
                img,
                
            })

          let type =   await Type.findAll({
                where:{ 
                     name: types } 
         }); 

        await poke.setTypes(type)

            res.send("Pokémon modificado :D ")
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
    deletePoke,
    putPoke
    
}