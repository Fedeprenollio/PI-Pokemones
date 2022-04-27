import {React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail , deletePoke, clearDetail} from '../redux/action'
import {Link, useParams ,useNavigate  } from "react-router-dom"
import { Nav } from './Nav'
import s from "./detail.module.css"


export const Detail = (props) => {

    
    const dispatch = useDispatch()
    
    let {id} = useParams()
    let navigate = useNavigate()

    useEffect( ()=>{
            dispatch(getDetail(id))
            return (()=>{
                dispatch(clearDetail())
            })
        } ,[dispatch]
        )
   
   
    const pokeDetail = useSelector( state=> state.detail)
    
    function handleDelete(e){
           if(window.confirm("¿Estas seguro de eliminar a tu pokémon?" ) === true) {
            if (e.target.name === "delete") {
                dispatch(deletePoke(e.target.value)); 
                alert(`Pokémon eliminado :( `)
                navigate("/home") 
           }
         } }

        function handleUpdate(e){
            if(window.confirm("¿Estas seguro de modificar a tu pokémon?" ) === true) {
                if (e.target.name === "update") {
                    // dispatch(updatePoke(props)); 
                  
                    
               }
             } }

     

        return (
            <div className={s.fondo}>
                <Nav/>

                {   pokeDetail.id ? 
                    <div >
                           
                       <h1 className={s.titulo}>Nombre: {pokeDetail.name}</h1>
                       <h4>Id: {pokeDetail.id}</h4>
                        <h3 className={s.h3} >Potencia: {pokeDetail.hp}</h3>
                        <h3 className={s.h3}>Ataque: {pokeDetail.attack}</h3>
                        <h3 className={s.h3}>Defensa: {pokeDetail.defense}</h3>
                        <h3 className={s.h3}>Velocidad: {pokeDetail.speed}</h3>
                        <h3 className={s.h3}>Altura: {pokeDetail.height}</h3>
                        <h3 className={s.h3}>Peso: {pokeDetail.weight}</h3>
                        <h3 className={s.h3}>Typo: {pokeDetail.createInBD ?  pokeDetail.types.map(t=> t.name + "  ") :   pokeDetail.types.map( t => "  " + t  ) }</h3>
                        
                        
                        <img className={s.img} src= {pokeDetail.image? pokeDetail.image : "https://programacion.net/files/article/20161110041116_image-not-found.png"  } alt="" />
                       {
                           pokeDetail.createInBD &&
                                <button className={s.btn_delete} onClick={(e)=> handleDelete(e)} value={pokeDetail.id} name="delete">Eliminar</button>
                                
                       }
                       {
                            pokeDetail.createInBD &&
                                    
                                    <button onClick={(e)=> handleUpdate(e)} value={pokeDetail.id} name="update">Modicar</button>
                                    
                                    
                                            
                       }                

                    </div>
                    : <div > Cargando...</div>
                }

        </div>



         )
}
