// import {React, useParams, useState }  from 'react'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { deletePoke, getPokemones, createdInBd , getTypes} from '../redux/action'
// import {Link} from "react-router-dom"
// import { Nav } from './Nav'





// export const Delete = () => {
//     const dispatch = useDispatch()
//     const pokeDetail = useSelector( state=> state.pokemonBD)
//     const allPokemones = useSelector((state) => state.pokemon);
   

    
//     useEffect(()=>{
//         dispatch(getPokemones())
//     },[dispatch])
     
//     useEffect(() => {
//         dispatch(getTypes());
//       }, [dispatch]);
 
//     useEffect(()=>{
//         dispatch(createdInBd())
//     },[dispatch])
//    console.log(pokeDetail)

   

//    function handleDelete(e){
   
//        if (e.target.name === "delete") {
//         dispatch(deletePoke(e.target.value)); 
//         alert(`Pokémon eliminado`)
//         window.location.reload(false)
//   }    
// }


//   return (
    
//     <>
//         <Nav></Nav>
//          <h2>Pokémones creados</h2>
//          {  pokeDetail.length > 0 ?
//              pokeDetail.map ( p => {
//                  return ( 
//                      <div> 
//                          <button onClick={(e)=>handleDelete(e)} value={p.id} name="delete" >Eliminar</button>
//                          <h3>Nombre: {p.name}</h3>
//                          <img src={p.image} alt="" />

//                      </div>
//                  )
//              }
//              ) : <h3>Cargando...</h3>
//          }

//     </>

//   )
// }
