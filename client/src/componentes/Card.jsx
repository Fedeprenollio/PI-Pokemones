import React from "react";
import {Link} from "react-router-dom"
import "./Card.css"


export default  function  Card ({name, image, createInBD, types}){

  // const pokemon =  useSelector( state => state.pokemon)
//    console.log(pokemon[1].createdInDb)
// console.log(types)

    return(
        <div>
            
                 <h2>{name}</h2>
            
            <div>
            <img className="img" src={image} alt="pokemones" />
            </div>
          
                   <h3>Tipo:</h3>
                          {

                    (createInBD===true) ? types.map( (t,i) =>  <h3 >{Object.values(types[i])} </h3>)   : types.map( (p)=> <h3>{p}</h3> )
                    }
            
        </div>
    )
}