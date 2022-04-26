import React from "react";
import { useState } from "react"
import {searchPoke, getPokemones} from  "../redux/action"
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "./Nav";
import s from "./searchBar.module.css"

function validated (search){
    let errors = {};
    
    if (search.input) {
        // if (search.trim() === "") {
        //   errors.search = "Se require un nombre";
        // } else
         if (search.input.match(/[^a-zA-Z]/)) {
          errors.input = "El nombre debe ser alfabetico, sin signos ni espacios";
        } else if (search.input.length < 1) {
          errors.input = "El nombre debe contener mas de una letra";
        } else if (search.input.length > 11) {
          errors.input = "El nombre no puede tener mas de 11 letras";
        }
        
        return errors
      }
     
}

export default function SearchBar() {
    const dispatch = useDispatch()

    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});


    const handleSearch =(e)=>{
        e.preventDefault()
      
        setSearch(e.target.value.toLowerCase())
       // console.log(e.target.value)
        setErrors( validated({
         ...search,
         [e.target.name]: e.target.value
     })
     
     )
     }
     
     
 const handleSubmit =  (e )=>{
   e.preventDefault()
   dispatch(searchPoke(search))
   setSearch("")
}   


    return (
        <>
            <Nav/>

            <form onSubmit={(e)=>handleSubmit(e)} >

                <input 
                    className= {errors?.search ? s.errorInput : s.input}
                    onChange={(e)=> handleSearch(e)} 
                    placeholder="Busca tu pokemon" 
                    type="text"  
                    name="input" 
                />
              
                {errors?.input &&  
                 <p className={s.errors}>{errors.input}</p> }

                   
               <button  
                    className={s.btn}
                    onClick={(e)=> handleSubmit(e)} 
                    type="submit">Buscar</button>
                
            </form>

        </>
    )

}



