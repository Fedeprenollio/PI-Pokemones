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
export const UPDATE_POKE = "UPDATE_POKE"



export const getPokemones = () => {
//hacer trycath
    return async function (dispatch) {

       try {
        let json = await axios(`http://localhost:3001/pokemons/`);
        return dispatch({
            type: GET_POKEMONES,
            payload: json.data
        })
       } catch (error) {
           
        alert("Pokémon no encontrado")
       } 
       
       
    }
};

export const getTypes = ()=>{
    return async function (dispatch) {
try {
    let json = await axios(`http://localhost:3001/types/`)

    return dispatch({
        type: GET_TYPES,
        payload: json.data
    })
} catch (error) {
    console.log(error)
}
       
    }

}
     
export const postPokemones = (payload)=>{
        return async function (dispatch){
try {
        
    let json = await axios.post(`http://localhost:3001/pokemons/`, payload)

    return json
} catch (error) {
    console.log(error)
}


          
        }

}



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
            let json = await axios(`http://localhost:3001/pokemons?name=${name}`)
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
        let json = await axios( `http://localhost:3001/pokemons/${id}` )     
        return dispatch({
            type:GET_DETAIL,
            payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}    
}



//------EXTRA redme---

export function deletePoke (id){
    return async function (dispatch){
        try {
             await axios.delete(`http://localhost:3001/pokemons/${id}` )

            return dispatch({
                type: DELETE_POKE,
                payload: id
                
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function updatePoke (id){
    return async function (dispatch){
        try {
             await axios.put(`http://localhost:3001/pokemons/${id}` )

            return dispatch({
                type: UPDATE_POKE,
                payload: id
                
            })
        } catch (error) {
            console.log(error)
        }
    }
}