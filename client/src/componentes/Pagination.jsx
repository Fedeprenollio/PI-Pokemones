import React from "react";
import s from "./pagination.module.css"

export const Pagination = ({currentPage, pokemonsInPage, allPokemones, paginado, paginadoPrev, paginadoNext, paginadoFirs,paginadoLast, handlePokeInPag }) => {
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
              
                <button key={num} className={s.btn} onClick={() => paginado(num)}>{num}</button>
              
            ))}
  
          <button  className={s.btn} onClick={() => paginadoNext()}  >Siguiente</button>
          <button  className={s.btn} onClick={() => paginadoLast()} >Ultimo</button>
        </div> 

            <label htmlFor="">Mostrar por pagina</label>
            <select className={s.selectPorPag} onClick={e=>handlePokeInPag(e)} name="" id="">
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
            

          
    </nav>
                  
  );
};
