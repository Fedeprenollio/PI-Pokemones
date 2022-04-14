import React from "react";

export const Pagination = ({ pokemonsInPage, allPokemones, paginado, paginadoPrev, paginadoNext, paginadoFirs,paginadoLast }) => {
  // console.log(pokemonsInPage)
  const numPag = [];

  for (let i = 1; i <= Math.ceil(allPokemones / pokemonsInPage); i++) {
    numPag.push(i);
  }

  return (
    <nav>
      <ul>
        <button  onClick={() => paginadoFirs(1)}>Primero</button>
        <button   onClick={() => paginadoPrev()}>Anterior</button>

        {numPag &&
          numPag.map((num) => (
            <li key={num}>
              <button onClick={() => paginado(num)}>{num}</button>
            </li>
          ))}

        <button onClick={() => paginadoNext()}  >Siguiente</button>
        <button onClick={() => paginadoLast()} >Ultimo</button>
      </ul>
    </nav>
  );
};
