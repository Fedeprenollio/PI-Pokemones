import axios from "axios";

export const GET_POKEMONES = "GET_POKEMONES";


export const getPokemones = async () => {

    return async function (dispatch){
        const json = await axios(`http://localhost:3001/pokemons`);
        return dispatch({
            type: GET_POKEMONES,
            payload: json.data
        })

    }


};
