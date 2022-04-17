
import { GET_POKEMONES, FILTER_TYPE, CREATED, SEARCH, ORDER_ALFAB, ORDER_BY_HP, POST_POKEMONES, GET_TYPES } from "../action";


let inicialState = {
    pokemon: [],
    allPokemonsForFilter: [],
    types: []

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

        // case FILTER_TYPE:
        //   const allPokemons = state.allPokemonsForFilter;
        //   const pokeFilter = (allPokemons.createInBD) && action.payload === "all" ? allPokemons : allPokemons.filter( p => p.types.toString() === action.payload)
        //  //console.log(allPokemons[7].types.toString())
        //  console.log(  pokeFilter)
        // const pokeFilterBD = (!allPokemons.createInBD) && action.payload === "all" ? allPokemons : allPokemons.filter( p => p.types.toString() === action.payload)
        // console.log(typeof  pokeFilterBD)
        //  return {
        //         ...state,
        //       pokemon: pokeFilter.concat(pokeFilterBD)
        //        
        // }

        case FILTER_TYPE:

            // const allPokemonsF = state.allPokemonsForFilter;
            // const pokeFilterTypeAPI = [];
            // const pokeFilterTypeBD = [];

            // // pokeFilterTypeAPI = !allPokemonsF.createInBD ? action.payload === "all" ? allPokemonsF : allPokemonsF.filter(p => p.types.includes(action.payload))

            // function filterTypeAPI() {
            //     if (!allPokemonsF.createInBD) {
            //         if (action.payload === "all") {
            //             return  allPokemonsF
            //         } else {
            //            return pokeFilterTypeAPI = allPokemonsF.filter(p => p.types.includes(action.payload))
            //         }
            //     }
            // }

            let allPokemonsArr = [];
            let allPokemons2 = state.allPokemonsForFilter;

             allPokemonsArr.push(allPokemons2)

             //let  pokeFilterArr = [];
             //let pokeFilter2 = action.payload

             //lo q viene por payload
            // pokeFilterArr.push(pokeFilter2)

            let str = action.payload

            let pokeFilterArr = action.payload === "all" ?  allPokemons2 :  allPokemons2.filter(  p=> p.types.includes( str)   )	

         //   let pokeFilterArrBD = allPokemons2.createInBD ? action.payload === "all" ?  allPokemons2 :  allPokemons2.filter(  p=> p.types.includes( str)   )	

            //  for(let i=0 ; i< allPokemonsArr.length ; i++) {
            //    let pokeFilterArr =  allPokemonsArr.filter(  p=> p.types[i].includes(action.payload)   )
            //  }
            //        if(     includes()    )

             
            console.log(str)
            
            return {
                ...state,
                pokemon: pokeFilterArr
              //  .concat(pokeFilterArrBD)
                        }

        case CREATED:
            const allPokemons = state.allPokemonsForFilter;
            const pokeFilter = action.payload === "bd" ? allPokemons.filter(p => p.createInBD) : allPokemons.filter(p => !p.createInBD)

            return {
                ...state,
                pokemon: action.payload === "todos" ? state.allPokemonsForFilter : pokeFilter

            };

        case SEARCH:
            return {
                ...state,
                pokemon: action.payload
            }


        default: return state

    }
}




export default rootReducer