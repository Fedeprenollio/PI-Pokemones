import {React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../redux/action'
import {Link, useParams} from "react-router-dom"
import { Nav } from './Nav'


export const Detail = (props) => {

    
    const dispatch = useDispatch()
    
        let {id} = useParams()
    
        useEffect( ()=>{
            dispatch(getDetail(id))
        } ,[dispatch])
   
   
        const pokeDetail = useSelector( state=> state.detail)
    
    console.log(pokeDetail)






        return (

            <>
                <Nav/>

                {   pokeDetail.name ? 
                    <div>
                       <h1>Nombre: {pokeDetail.name}</h1>
                        <h3>Potencia: {pokeDetail.hp}</h3>
                        <h3>Ataque: {pokeDetail.attack}</h3>
                        <h3>Defensa: {pokeDetail.defense}</h3>
                        <h3>Velocidad: {pokeDetail.speed}</h3>
                        <h3>Altura: {pokeDetail.height}</h3>
                        <h3>Peso: {pokeDetail.weight}</h3>
                        <h3>Typo: {pokeDetail.createInBD ?  pokeDetail.types.map(t=> t.name + "  ") :   pokeDetail.types.map( t => "  " + t  ) }</h3>
                        <img src= {pokeDetail.image} alt="" />
                       

                    </div>
                    : <p>Cargando informacion..</p>
                }

            </>



         )
}
