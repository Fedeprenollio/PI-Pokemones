import React from "react";
import { Link } from "react-router-dom";

export const LandinPage = () => {
  return (
    <div>
      <h1>Pagina principal</h1>
      <Link to="/pokemons">
        <button>Home</button>
      </Link>
    </div>
  );
};
