import React from "react";
import { useState } from "react"
import {searchPoke} from  "../redux/action"
import { useDispatch } from "react-redux";


export default function SearchBar() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    

    const handleSearch =(e)=>{
     e.preventDefault()
        setSearch(e.target.value)
       // console.log(e.target.value)
 }

 
 const onSubmit = (e )=>{
   e.preventDefault()
    dispatch(searchPoke(search))
    setSearch("")
}   


    return (
        <>
            <h4>Soy una barra de busqueda</h4>

            <form onSubmit={(e)=>onSubmit(e)} >

                <input onChange={(e)=> handleSearch(e)} placeholder="Busca tu pokemon" type="text"  />
               <button  onClick={(e)=> onSubmit(e)} type="submit"> Buscar</button>
                
            </form>

        </>
    )

}



