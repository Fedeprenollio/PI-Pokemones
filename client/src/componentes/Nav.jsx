import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemones } from "../redux/action";
//import SearchBar from "./SearchBar";

export const Nav = () => {






  



  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/created">
        <button>Crear pokémon</button>
      </Link>
      {/* <Link to="/delete">
      <button >Eliminar pokémon creado</button>
      </Link> */}
      
     
    </div>
  );
};
