import { GET_POKEMONES } from "../action";


const inicialState= {
    pokemon: []
}


function rootReducer (state=inicialState, action) {

switch (action.type) {
    case GET_POKEMONES:
        return { ...state, 
                    pokemon: action.payload}
        

    default:
        break;
}


}












export default rootReducer