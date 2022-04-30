import axios from "axios";


export const GET_POKEMONES = "GET_POKEMONES";
export const GET_TYPES = "GET_TYPES"
export const POST_POKEMONES = "POST_POKEMONES";
export const ORDER_ALFAB = "ORDER_ALFAB";
export const ORDER_BY_HP = "ORDER_BY_HP";
export const CREATED = "CREATED";
export const SEARCH = "SEARCH"
export const FILTER_TYPE = "FILTER_TYPE";
export const GET_DETAIL = "GET_DETAIL";
export const DELETE_POKE = "DELETE_POKE";
export const UPDATE_POKE = "UPDATE_POKE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const PUT_POKE = "PUT_POKE"



export const getPokemones = () => {
//hacer trycath
    return async function (dispatch) {


        axios("/pokemons/")
            .then( pokemon => {
                return  dispatch({
                type: GET_POKEMONES,
                payload: pokemon.data
            })} )
            .catch(err => { console.log(err)
              return  alert("Pokémon no encontrado")

            }  )


    //    try {
    //     let json = await axios(`http://localhost:3001/pokemons/`);
    //     return dispatch({
    //         type: GET_POKEMONES,
    //         payload: dat
    //     })
    //    } catch (error) {
           
    //     alert("Pokémon no encontrado")
    //    } 
       }
};

export const getTypes = ()=>{

return function(dispatch){
    axios(`/types/`)
        .then(type=> {
            return dispatch({
                type: GET_TYPES,
                payload: type.data
            })
        })
        .catch(err=>console.log(err))


}
}
     
export const postPokemones = (payload)=>{
        return async function (dispatch){
try {
        
    let json = await axios.post(`/pokemons/`, payload)  //url + body

    return json
} catch (error) {
    console.log(error)
}
 }}



export const orderByAlfab = (payload) => {
    return {

        type: ORDER_ALFAB,
        payload
    }}

 export const orderByHp = (payload)  =>{
     try {
         
     return {
        type: ORDER_BY_HP,
        payload
    }
     } catch (error) {
     console.log(error)    
     }
 }  


export const createdInBd = (payload) => {
try {
    return {
        type: CREATED,
        payload
    }
} catch (error) {
    console.log(error)
}
 
};

export const filterByType = (payload) =>{
    
    try {
        return {
            type: FILTER_TYPE,
            payload
        }
    } catch (error) {
        console.log(error)
    }

};

export const searchPoke = (name) => {
    return async function (dispatch) {

        try {
            let json = await axios(`/pokemons?name=${name}`)
            return dispatch({
                type: SEARCH,
                payload: json.data
            })
    
        } catch (error) {
           
           alert("El pokémon no existe")
           
        }

       
    }
};

export function getDetail (id){

return async function (dispatch){
    try {
        let json = await axios( `/pokemons/${id}` )     
        return dispatch({
            type:GET_DETAIL,
            payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}    
}

export function clearDetail (){
    return {
        type: CLEAR_DETAIL
    }
    
}

//------EXTRA redme---

export function deletePoke (id){
    return async function (dispatch){
        try {
             await axios.delete(`/pokemons/${id}` )

            return dispatch({
                type: DELETE_POKE,
                payload: id
                
            })
        } catch (error) {
            console.log(error)
        }
    }
};


export function pokemonUpdate (poke){
// return {
//     type: PUT_POKE,
//     payload: poke
// }


    // return async function (dispatch){
    //     try {
    //          await axios.put(`http://localhost:3001/pokemons/${id}`, poke )

    //         return dispatch({
    //             type: PUT_POKE,
    //             payload: poke
                
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}


