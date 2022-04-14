import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export const Nav = () => {
  return (
    <div>
      <Link to="/pokemons">
        <button>Home</button>
      </Link>
      <Link to="/">
        <button>Crear pokemon</button>
      </Link>
      <SearchBar/>
    </div>
  );
};
