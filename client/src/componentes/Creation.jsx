import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemones, getTypes } from "../redux/action"
//import { Link } from "react-router-dom"
import {useHistory} from "react-router-dom"



export default function Creation() {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)

   // const history = useHistory()


    const [input, setInput] = useState({

        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",      
        types: []

    })

    useEffect(() => {
        dispatch(getTypes())
    }, [])

     function handleForm(e) {
       // e.preventValue()
        setInput( {
            ...input,
            [e.target.name] : e.target.value
        })
        
    }

    function handleSelect(e) {
        setInput ({
            ...input,
            types : [ ...input.types,  e.target.value ]
            
        })
        }
        
    function handleSubmit (e) {
        e.preventDefault()
       // console.log(input)
        dispatch(postPokemones(input))
      alert("Poke Creado")
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            image: "",      
            types: []
        })
       // history.push("/home")
    }
    return (

        <>
            
            <h3>a crear</h3>
            <form onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <label  >Nombre</label>
                        <input onChange={(e)=> handleForm(e)} type="text"  value={input.name}  name="name" />
                    </div>
                    <div>
                        <label  >Potencia</label>
                        <input onChange={(e)=> handleForm(e)} type="number"  value={input.hp}  name="hp" />
                    </div>
                    <div>
                        <label  >Ataque</label>
                        <input onChange={(e)=> handleForm(e)} type="number"  value={input.attack}  name="attack" />
                    </div>
                    <div>
                        <label  >Defensa</label>
                        <input onChange={(e)=> handleForm(e)} type="number"  value={input.defense}  name="defense" />
                    </div>
                    <div>
                        <label  >Velocidad</label>
                        <input onChange={(e)=> handleForm(e)} type="number"  value={input.speed}  name="speed" />
                    </div>
                    <div>
                        <label  >Altura</label>
                        <input onChange={(e)=> handleForm(e)} type="number"  value={input.height}  name="height" />
                    </div>
                    <div>
                        <label  >Peso</label>
                        <input  onChange={(e)=> handleForm(e)} type="number"  value={input.weight}  name="weight" />
                    </div>
                    {/* <div>
                        <label  >Tipo</label>
                        <input type="checkbox"  value={input.types}  name="types" />
                    </div>   */}
                    <div>
                        <label  >Imagen</label>
                        <input onChange={(e)=> handleForm(e)} type="text"  value={input.image}  name="image" />
                    </div>
                    <div>
                        <label  >Tipo</label>
                        <select onChange={(e)=> handleSelect(e)} >

                                {types.map( t =>  (
                                    <option  value={t.name}>{t.name}</option>
                                ))}

                        </select>
                    </div>
                    <ul><li>{input.types.map( t=>   t + " ,")} </li></ul>
                    <div>
                        <button  type="submit">Crear pokemon</button>
                    </div>








            </form>



        </>



    )

}