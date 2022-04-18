import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemones, getTypes, getPokemones } from "../redux/action";
//import { Link } from "react-router-dom"
import { Link, useHistory  } from "react-router-dom";


function validated(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (input.hp > 500 ) {
    errors.hp = "El valor debe estar entre 1 y 500";
  } else if ( input.attack > 500) {
    errors.attack = "El valor debe estar entre 1 y 500";
  } else if (input.defense > 500) {
    errors.defense = "El valor debe estar entre 1 y 500";
  } else if (input.weight > 1500) {
    errors.weight = "El valor debe estar entre 1 y 1500";
  } else if (input.speed > 1000) {
    errors.speed = "El valor debe estar entre 1 y 1000";
  } else if ( input.height > 500) {
    errors.height = "El valor debe estar entre 1 y 500";
  }
  //-- error de ausencia de dato/
//   else if (!input.hp) {
//     errors.hp = "Se requiere la potencia del pokémon";
//   } else if (!input.attack) {
//     errors.attack = "Se requiere el ataque del pokémon";
//   } else if (!input.defense) {
//     errors.defense = "Se requiere la defensa del pokémon";
//   } else if (!input.weight) {
//     errors.weight = "Se requiere el peso del pokémon";
//   } else if (!input.speed) {
//     errors.speed = "Se requiere la velocidad del pokémon";
//   } else if (!input.height) {
//     errors.height = "Se requiere la altura del pokémon";
//   }

  return errors;
}

export default function Creation() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const pokemonsExistente = useSelector( state => state.pokemon)
console.log(types)
console.log(pokemonsExistente)
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
    types: [],
  });

  const [errors, setErrors] = useState({});

  
  

  

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
 
  useEffect(() => {
    dispatch(getPokemones());
  }, [dispatch]);

    function handleForm  (e)    {
    // e.preventValue()
     
    
      setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validated({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleDelete(t) {
    setInput({
      ...input,
      types: input.types.filter((ty) => ty !== t),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input)
    console.log(pokemonsExistente)
    const nameRepit = pokemonsExistente.find(p => p.name === input.name )
    console.log(input.name)
    console.log(nameRepit)
    console.log(pokemonsExistente[44].name)
    if(nameRepit) {
      alert("El nombre ya existe");
      return
    }else { 

   
    
    dispatch(postPokemones(input));
    alert("Poke Creado");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });
    }
   //  history.push("/home")
  }

  return (
    <>
      <Link to="/home">
      <button>Home</button>
      </Link>


      <h3>Crea tu pokemon</h3>
      <form onSubmit={(e) => handleSubmit(e)}>

        <div>
          <label>Nombre * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="text"
            value={input.name}
            name="name"
            placeholder="Nombre"
            minLength="1" 
            maxLength="11" 
            required
          />

          {errors.name && <p className="error">{errors.name} </p>}
        </div>

        <div>
          <label>Potencia * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.hp}
            name="hp"
            required
            placeholder="Potencia"
            min="1"
            max="500"
          />
          {errors.hp && <p className="error">{errors.hp} </p>}
        </div>

        <div>
          <label>Ataque * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.attack}
            name="attack"
            required
            placeholder="Ataque"
            min="1"
            max="500"
          />
          {errors.attack && <p className="error">{errors.attack} </p>}
        </div>

        <div>
          <label>Defensa * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.defense}
            name="defense"
            required
            placeholder="Defensa"
            min="1"
            max="500"
          />
          {errors.defense && <p className="error">{errors.defense} </p>}
        </div>

        <div>
          <label>Velocidad * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.speed}
            name="speed"
            required
            placeholder="Velocidad"
            min="1"
            max="1000"
          />
          {errors.speed && <p className="error">{errors.speed} </p>}
        </div>

        <div>
          <label>Altura * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.height}
            name="height"
            required
            placeholder="Altura"
            min="1"
            max="500"
          />
          {errors.height && <p className="error">{errors.height} </p>}
        </div>

        <div>
          <label>Peso * </label>
          <input
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.weight}
            name="weight"
            required
            placeholder="Peso"
            min="1"
            max="1500"
          />
          {errors.weight && <p className="error">{errors.weight} </p>}
        </div>
       
        <div>
          <label>Imagen</label>
          <input
            onChange={(e) => handleForm(e)}
            type="text"
            value={input.image}
            name="image"
            placeholder="Imagen"
            
          />
        </div>

        <div>
          <label>Tipo * </label>
          <select  onChange={(e) => handleSelect(e)}>
            <option>-----</option>
            {types.map((t) => (
              <option  value={t.name}>{t.name}</option>
            ))}
            {errors.types && <p className="error">{errors.types} </p>}
          </select>
        </div>

          {

           !pokemonsExistente ? <button>Crear pokemon </button> :
        <div>
          <button type="submit">Crear pokemon</button>
        </div>
          }

              

        <h5>(*) Campos obligatorios</h5>
      </form>
      {input.types.map((t) => (
        <div>
          <p>{t}</p>
          <button onClick={() => handleDelete(t)}>X</button>
        </div>
      ))}
    </>
  );
}
