import { GET_POKEMONES } from "../action";


 let inicialState= {
    pokemon: []
    
}


function rootReducer (state=inicialState, action) {

switch (action.type) {
    case GET_POKEMONES:
        return { ...state, 
                    pokemon: action.payload}
        

    default: return state
        
}


}




export default rootReducer