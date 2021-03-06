import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemones, getTypes, getPokemones } from "../redux/action";

import { Link, useNavigate  } from "react-router-dom";
import styles from "./creation.module.css"
import { Nav } from "./Nav";

function validated(input) {
  let errors = {};
  if (input.name) {
    if (input.name.trim() === "") {
      errors.name = "Se require un nombre";
    } else if (input.name.match(/[^a-zA-Z]/)) {
      errors.name = "El nombre debe ser alfabetico,sin signos ni espacios";
    } else if (input.name.length < 1) {
      errors.name = "El nombre debe contener mas de una letra";
    } else if (input.name.length > 11) {
      errors.name = "El nombre no puede tener mas de 11 letras";
    }
  }
// console.log(input)
  if (input.hp) {
    if (input.hp.trim() === "") {
      errors.hp = "Se requiere la potencia del pokémon";
    } else if (isNaN(input.hp)) {
      errors.hp = "El valor debe ser numerico";
    } else if  (input.hp > 500 || input.hp< 1 ) {
        errors.hp = "El valor debe estar entre 1 y 500";
    } 
  }

  if (input.attack) {
    if (input.attack.trim() === "") {
      errors.attack = "Se requiere la potencia del pokémon";
    } else if (input.attack.match([0-9])) {
      errors.attack = "El valor debe ser numerico";
    } else if  (input.attack > 500 || input.attack< 1 ) {
        errors.attack = "El valor debe estar entre 1 y 500";
    } 
  }

  if (input.defense) {
    if (input.defense.trim() === "") {
      errors.defense = "Se requiere la potencia del pokémon";
    } else if (input.defense.match([0-9])) {
      errors.defense = "El valor debe ser numerico";
    } else if  (input.defense > 500 || input.defense< 1 ) {
        errors.defense = "El valor debe estar entre 1 y 500";
    } 
  }


  if (input.weight) {
    if (input.weight.trim() === "") {
      errors.weight = "Se requiere la potencia del pokémon";
    } else if (input.weight.match([0-9])) {
      errors.weight = "El valor debe ser numerico";
    } else if  (input.weight > 1500 || input.weight< 1 ) {
        errors.weight = "El valor debe estar entre 1 y 1500";
    } 
  }

  if (input.speed) {
    if (input.speed.trim() === "") {
      errors.speed = "Se requiere la potencia del pokémon";
    } else if (input.speed.match([0-9])) {
      errors.speed = "El valor debe ser numerico";
    } else if  (input.speed > 1000 || input.speed< 1 ) {
        errors.speed = "El valor debe estar entre 1 y 1000";
    } 
  }
 
  if (input.height) {
    if (input.height.trim() === "") {
      errors.height = "Se requiere la potencia del pokémon";
    } else if (input.height.match([0-9])) {
      errors.height = "El valor debe ser numerico";
    } else if  (input.height > 500 || input.height< 1 ) {
        errors.height = "El valor debe estar entre 1 y 500";
    } 
  }
 
  if (input.types.length === 0) {
          errors.types = "Seleccione al menos un tipo para su nuevo pokémon"
    }

    if (input.image) {
      if (!input.image.match(/((ftp|http|https)\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-])*((\.jpg)|(\.png)|(\.jpeg)|(\.svg))\/?(\.webp)?/)) {
        errors.image = "No tiene apariencia de una URL valida de imagen.Si continuas, tu pokémon podría no tener imagen";
      }
    }
    // (?:(?:(?:https?|ftp):)?//)
    // /((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/gm
    // /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return errors;
}

export default function Creation() {
  const dispatch = useDispatch();
  let navigate = useNavigate()

  const types = useSelector((state) => state.types);
  const pokemonsExistente = useSelector( state => state.pokemon)


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
     e.preventDefault()
     setInput({
      ...input,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    setErrors( validated({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    
  }

  function handleSelect(e) {
    e.preventDefault()
    if(!input.types.includes(e.target.value)) {

      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      setErrors(validated({
        ...input, 
        types: [...input.types, e.target.value]}));
    }
  }
 console.log(types)
    
  

  function handleDelete(t) {
    setInput({
      ...input,
      types: input.types.filter((ty) => ty !== t),
    });
  };

  function handleSubmit(e) {
   e.preventDefault();
    
    const nameRepit = pokemonsExistente.find(p => p.name === input.name )
       
    if(nameRepit) {
      alert("El nombre ya existe");
      return
    }else if(errors?.name ||errors?.hp ||errors?.attack  ||errors?.defense ||errors?.speed ||errors?.height ||errors?.weight || !input.name || !input.hp ||!input.speed ||!input.attack ||!input.weight ||!input.height ||!input.types){
        alert("Complete los campos correctamente")

    } else if (input.types.length === 0){
      alert("Seleccione al menos un tipo para su pokémon")
    } else {
      
      if(window.confirm("¿Estas seguro de crear a tu pokémon?" ) === true){
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
       navigate("/home")

      }
   }
  }

  return (
    <div className={styles.content}>
    <Nav/>

      {/* <Link to="/home">
      <button>Home</button>
      </Link> */}


      
      <div   >
        <h3 className={styles.hola}>Crea tu pokemon</h3>
      
      <form className={styles.form} onSubmit={ (e) => handleSubmit(e)}>

     

        <div  >
          <label className={styles.label}  >Nombre * </label>
          <input
             className={errors?.name ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="text"
            value={input.name}
            name="name"
            placeholder="Nombre"
            minLength="1" 
            maxLength="11" 
            required   
          />

          {errors?.name &&  
                 <p className={styles.errors}>{errors.name} </p> }
        </div>

        <div>
          <label className={styles.label}>Potencia * </label>
          <input
           className={errors?.hp ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.hp}
            name="hp"
            required               
            placeholder="Potencia"
            min="1"
            max="500"
          />
          {errors?.hp &&  
                 <p className={styles.errors}>{errors.hp} </p> }
        </div>

        <div>
          <label className={styles.label}>Ataque * </label>
          <input
           className={errors?.attack ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.attack}
            name="attack"
            required   
              
            placeholder="Ataque"
            min="1"
            max="500"
          />
         {errors?.attack &&  
                 <p className={styles.errors}>{errors.attack} </p> }
        </div>

        <div>
          <label className={styles.label}>Defensa * </label>
          <input
             className={errors?.defense ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.defense}
            name="defense"
            required   
        
            placeholder="Defensa"
            min="1"
            max="500"
          />
           {errors?.defense &&  
                 <p className={styles.errors}>{errors.defense} </p> }
        </div>

        <div>
          <label className={styles.label}>Velocidad * </label>
          <input
           className={errors?.speed ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.speed}
            name="speed"
            required   
              
            placeholder="Velocidad"
            min="1"
            max="1000"
          />
              {errors?.speed &&  
                 <p className={styles.errors}>{errors.speed} </p> }
        </div>

        <div>
          <label className={styles.label}>Altura * </label>
          <input
            className={errors?.height ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.height}
            name="height"
            required   

            placeholder="Altura"
            min="1"
            max="500"
          />
           {errors?.height &&  
                 <p className={styles.errors}>{errors.height} </p> }
        </div>

        <div>
          <label className={styles.label}>Peso * </label>
          <input
            className={errors?.weight ? styles.errorInput : styles.input}
            onChange={(e) => handleForm(e)}
            type="number"
            value={input.weight}
            name="weight"
            required   
              
            placeholder="Peso"
            min="1"
            max="1500"
          />
            {errors?.weight &&  
                 <p className={styles.errors}>{errors.weight} </p> }
        </div>
       
        <div>
          <label className={styles.label}>Imagen **</label>
          <input
            className={styles.input}
            onChange={(e) => handleForm(e)}
            type="url"
            value={input.image}
            name="image"
            placeholder="URL de la imagen"
            
          />

{errors?.image &&  
                 <p className={styles.errors}>{errors.image} </p> }
        </div>

        <div>
          <label className={styles.label}>Tipo * </label>
          <select 
             required   
                      
                  onChange={(e) => handleSelect(e)}
                  className={errors?.types ? styles.errorInput : styles.input}
                  name= "types">
            <option  disabled selected="selected"  >Seleccione al menos un tipo</option>   

            {    
              types.map((t,i) => (
              <option key={i}  value={t.name}>{t.name}</option>
            ))
            
            }
            
           
           
          </select>

          {   errors?.types &&  
                 <p className={styles.errors}>{errors.types} </p> }
        </div>

        { 
        input.types.map((t,i) => (
          <div key={i} className={styles.content_select}>
              <h5 key={i} className={styles.addType}>{t}</h5>
              <button 
                               
                  className={styles.btn_close}
                  type="button" 
                  onClick={() => handleDelete(t)}>X</button>

        </div>
        )) 
      }

          
          <h5 className={styles.campos}>(*) Campos obligatorios</h5>
          <h5 className={styles.campos}>(**) La imagen debe estar libre de copyright y asegúrate que su URL sea correcta</h5>
          {

            
            // errors?.name ||errors?.hp ||errors?.attack  ||errors?.defense ||errors?.speed ||errors?.height ||errors?.weight || !input.name || !input.hp ||!input.speed ||!input.attack ||!input.weight ||!input.height ||!input.types ?   <button type="button">Para crear, completa correctamente los campos</button>  :
                  <div>
                        <button className={styles.btn_crear}>Crear pokemon</button>
                 </div>
            }



       
      </form>
      </div>
      </div>
  );
}
