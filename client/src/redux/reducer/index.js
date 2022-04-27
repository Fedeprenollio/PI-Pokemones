
import { GET_POKEMONES, FILTER_TYPE, CREATED, SEARCH, ORDER_ALFAB, ORDER_BY_HP, POST_POKEMONES, GET_TYPES, GET_DETAIL, DELETE_POKE, UPDATE_POKE,  FILTER_SPEED_MIN, CLEAR_DETAIL } from "../action";


let inicialState = {
    pokemon: [],
    allPokemonsForFilter: [],
    types: [],
    detail: [],
    pokemonBD: [],
    pokemonUpdate: [],
    

}


function rootReducer(state = inicialState, action) {

    switch (action.type) {

        case GET_POKEMONES:
            return {
                ...state,
                pokemon: action.payload,
                allPokemonsForFilter: action.payload
            };

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case POST_POKEMONES:
            return {
                ...state
            }

        case ORDER_ALFAB:
            let pokeOrderAlfab = action.payload === "asc" ?
                state.pokemon.sort((a, b) => {
                    if (a.name > b.name) { return 1 }
                    if (a.name < b.name) { return -1 }
                    else { return 0 }
                }) : action.payload === "des" ?
                    state.pokemon.sort((a, b) => {
                        if (a.name > b.name) { return -1 }
                        if (a.name < b.name) { return 1 }
                        else { return 0 }
                    }) : state.pokemon.sort((a, b) => { return 0 })

            return {
                ...state,
                pokemon: pokeOrderAlfab
            };

        case ORDER_BY_HP:
            let pokeOrderHP = action.payload === "asc" ?
                state.pokemon.sort((a, b) => {
                    if (a.hp > b.hp) { return 1 }
                    if (a.hp < b.hp) { return -1 }
                    else { return 0 }
                }) : action.payload === "des" ?
                    state.pokemon.sort((a, b) => {
                        if (a.hp > b.hp) { return -1 }
                        if (a.hp < b.hp) { return 1 }
                        else { return 0 }
                    }) : state.pokemon.sort((a, b) => { return 0 })
            return {
                ...state,
                pokemon: pokeOrderHP
            }

        case FILTER_TYPE:
           
            let allPokemons2 = state.allPokemonsForFilter;
         
            let str = action.payload

            let pokeFilterAPI = action.payload === "all" ?  allPokemons2 :  allPokemons2.filter(  p=> p.types.includes( str)   )	
           
           // const pokeFilterBD=allPokemons2.filter(p=>p.types)
            const pokeFilterTypeBD = allPokemons2.filter(p=>p.types.find(t=>t.name===action.payload))

            let typesAll = pokeFilterAPI.concat(pokeFilterTypeBD) 
                   if(typesAll.length=== 0){
                       alert("No hay pokémones de éste tipo")    
                       typesAll  = allPokemons2
                   }
            return {
                ...state,
                pokemon: typesAll
      
             }

        case CREATED:
            const allPokemons = state.allPokemonsForFilter;
            let pokeFilter = action.payload === "bd" ? allPokemons.filter(p => p.createInBD) : allPokemons.filter(p => !p.createInBD)

            if(pokeFilter.length=== 0){
                alert("No hay pokémones de ésta categoria")    
                pokeFilter  = allPokemons
            }

            return {
                ...state,
                pokemon: action.payload === "todos" ? state.allPokemonsForFilter : pokeFilter,
          
            };

        case SEARCH:
           
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            };


        case CLEAR_DETAIL:
            return {
                ...state,
                detail: []
            }    
            //------extra redme
        
        case DELETE_POKE:
            let allPokemons3 = state.allPokemonsForFilter

            const pokeDeleteBD = allPokemons3.filter( p => p.id !== action.payload)
            return{
                ...state,
                pokemon: pokeDeleteBD
            };

   


        
        default: return state

    }
}







export default rootReducer