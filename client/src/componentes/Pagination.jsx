import React from "react";
import s from "./pagination.module.css"

export const Pagination = ({ pokemonsInPage, allPokemones, paginado, paginadoPrev, paginadoNext, paginadoFirs,paginadoLast }) => {
  // console.log(pokemonsInPage)
  const numPag = [];

  for (let i = 1; i <= Math.ceil(allPokemones / pokemonsInPage); i++) {
    numPag.push(i);
  }

  return (

    
    allPokemones && 
    <nav className={s.pagination}>
      
          <div>
          <button  className={s.btn} onClick={() => paginadoFirs(1)}>Primero</button>
          <button  className={s.btn} onClick={() => paginadoPrev()}>Anterior</button>
  
          { numPag &&
            numPag.map((num) => (
              
                <button className={s.btn} onClick={() => paginado(num)}>{num}</button>
              
            ))}
  
          <button  className={s.btn} onClick={() => paginadoNext()}  >Siguiente</button>
          <button  className={s.btn} onClick={() => paginadoLast()} >Ultimo</button>
        </div> 
     

            
    </nav>
                  
  );
};
