import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getPokemones } from "../redux/action";
import Card from "./Card";
import { getPokemones } from "../redux/action";
import { Pagination } from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemones = useSelector((state) => state.pokemon);

//-------PAGINADO----///
  let [currentPage, setCurrentPage] = useState(1);
  const [pokemonsInPage, setPokemonsInPage] = useState(12)

  const indexOfLastPoke = currentPage * pokemonsInPage;
  const indexOfFirstPoke = indexOfLastPoke - pokemonsInPage;

  const currentPokes = allPokemones.slice(indexOfFirstPoke, indexOfLastPoke)



  const paginado = (NumPag)=>{
    setCurrentPage(NumPag)

  }


  const paginadoPrev = (NumPag) =>{
   if(currentPage>1) setCurrentPage(currentPage-1)
  };

  const paginadoNext = (NumPag) =>{
    if(currentPage < (Math.ceil(allPokemones.length / pokemonsInPage)) ) setCurrentPage(currentPage+1)
   };

   const paginadoFirs = (NumPag) =>{
     setCurrentPage(currentPage=1)
   };

   const paginadoLast = (NumPag) =>{
    setCurrentPage(currentPage=(Math.ceil(allPokemones.length / pokemonsInPage)))
   }


//----FIN PAGINADO----//

  useEffect(() => {
    dispatch(getPokemones());
  }, [dispatch]);

  return (
    <>
      <div>
        Ordenar alfabeticamente
        <select name="Ordenar de forma..." id="">
          <option value="des">A-Z</option>
          <option value="asc">Z-A</option>
        </select>
      </div>

      <div>
        Ordenar por
        <select name="Ordenar de forma..." id="">
          <option value="Mas furtes">Mas furtes primero</option>
          <option value="Menos fuertes">Menos fuertes primero</option>
        </select>
      </div>

      <div>
        Filtrar por tipo
        <select name="Ordenar de tipo..." id="">
          <option value="steel">todos</option>
          <option value="steel">acero</option>
          <option value="water">agua</option>
          <option value="dragon">dragón</option>
          <option value="electric">eléctrico</option>
          <option value="bug">insecto</option>
          <option value="ghost">fantasma</option>
          <option value="fire">fuego</option>
          <option value="fairy">hada</option>
          <option value="ice">hielo</option>
          <option value="grass">hierba</option>
          <option value="normal">Normal</option>
          <option value="dark">oscuro</option>
          <option value="fighting">pelea</option>
          <option value="psychic">psíquico</option>
          <option value="rock">roca</option>
          <option value="shadow">sombra</option>
          <option value="ground">tierra</option>
          <option value="poison">veneno</option>
          <option value="flying">volador</option>
          <option value="unknown">desconocido</option>
        </select>
      </div>

      <div>
        Filtrar por
        <select name="Ordenar de forma..." id="">
          <option value="todos">Todos</option>
          <option value="origin">Originales</option>
          <option value="creados">Creados</option>
        </select>
      </div>
      <Pagination pokemonsInPage={pokemonsInPage}
                    allPokemones={allPokemones.length}
                    paginado={paginado}
                    paginadoPrev={paginadoPrev}
                    paginadoNext={paginadoNext}
                    paginadoFirs={paginadoFirs}
                    paginadoLast={paginadoLast}
                      />
      <h3>Pagina {currentPage} </h3>
      <div>
        {currentPokes &&
          currentPokes.map((p ) => ( 
            <Card  types={p.types} createInBD={p.createInBD} name={p.name}  image={p.image} />
          ))}
      </div>
    </>
  );
}
