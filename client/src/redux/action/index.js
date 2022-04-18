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



export const getPokemones = () => {
//hacer trycath
    return async function (dispatch) {
        let json = await axios(`http://localhost:3001/pokemons/`);
        return dispatch({
            type: GET_POKEMONES,
            payload: json.data
        })
    }};

export const getTypes = ()=>{
    return async function (dispatch) {

        let json = await axios(`http://localhost:3001/types/`)

        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }

}
     
export const postPokemones = (payload)=>{
        return async function (dispatch){
            let json = await axios.post(`http://localhost:3001/pokemons/`, payload)

            return json
        }

}



export const orderByAlfab = (payload) => {
    return {

        type: ORDER_ALFAB,
        payload
    }}

 export const orderByHp = (payload)  =>{
     return {
         type: ORDER_BY_HP,
         payload
     }
 }  


export const createdInBd = (payload) => {

    return {
        type: CREATED,
        payload
    }
};

export const filterByType = (payload) =>{
    return {
        type: FILTER_TYPE,
        payload
    }

};

export const searchPoke = (name) => {
    return async function (dispatch) {

        let json = await axios(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: SEARCH,
            payload: json.data
        })

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
