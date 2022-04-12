import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPokemones } from "../../redux/action";


export default function Home (){

    const dispatch = useDispatch();
    const allPokemones = useSelector( state => state.pokemon)
    // console.log(allPokemones)


  //  useEffect( ()=>{ dispatch(getPokemones())   }, []   )

return (
    
        <div>




        </div>
    
    
    
)



}