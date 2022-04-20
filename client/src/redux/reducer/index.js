
import { GET_POKEMONES, FILTER_TYPE, CREATED, SEARCH, ORDER_ALFAB, ORDER_BY_HP, POST_POKEMONES, GET_TYPES, GET_DETAIL, DELETE_POKE } from "../action";


let inicialState = {
    pokemon: [],
    allPokemonsForFilter: [],
    types: [],
    detail: [],
    pokemonBD: []

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
           // let allPokemonsArr = [];
            let allPokemons2 = state.allPokemonsForFilter;

          //   allPokemonsArr.push(allPokemons2)
            let str = action.payload

            let pokeFilterAPI = action.payload === "all" ?  allPokemons2 :  allPokemons2.filter(  p=> p.types.includes( str)   )	
           
            const pokeFilterBD=allPokemons2.filter(p=>p.types)
            const pokeFilterTypeBD = pokeFilterBD.filter(p=>p.types.find(t=>t.name===action.payload))

            const typesAll = pokeFilterAPI.concat(pokeFilterTypeBD) 
                       
            return {
                ...state,
                pokemon: typesAll
              //  .concat(pokeFilterAPIBD)
             }

        case CREATED:
            const allPokemons = state.allPokemonsForFilter;
            const pokeFilter = action.payload === "bd" ? allPokemons.filter(p => p.createInBD) : allPokemons.filter(p => !p.createInBD)

            return {
                ...state,
                pokemon: action.payload === "todos" ? state.allPokemonsForFilter : pokeFilter,
              //  pokemonBD : allPokemons.filter(p => p.createInBD)

            };

        case SEARCH:
            // const pokeSearch = state.allPokemonsForFilter
            // console.log(action.payload[0].name)
            // const search = pokeSearch.filter( p=> p.name === action.payload.name)
        
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
            //------extra redme
        
        case DELETE_POKE:
            let allPokemons3 = state.allPokemonsForFilter

            const pokeDeleteBD = allPokemons3.filter( p => p.id !== action.payload)
            
            
        
             return{
                ...state,
                pokemon: pokeDeleteBD
            }
        default: return state

    }
}







export default rootReducer