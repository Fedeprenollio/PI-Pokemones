import React  from "react";
import { Link } from "react-router-dom";
import s from "./nav.module.css"


export const Nav = () => {

  return (
    <div>
      <Link to="/home">
        <button className={s.btn}>Home</button>
      </Link>
      <Link to="/created">
        <button className={s.btn}>Crear pokémon</button>
      </Link>
      
      
     
    </div>
  );
};
