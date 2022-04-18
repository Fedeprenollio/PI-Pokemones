import React from "react";
import { Link } from "react-router-dom";
//import SearchBar from "./SearchBar";

export const Nav = () => {




  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/created">
        <button>Crear pokemon</button>
      </Link>
      
     
    </div>
  );
};
