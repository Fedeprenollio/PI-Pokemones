import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import { getPokemones, createdInBd, orderByAlfab, orderByHp, getTypes, filterByType } from "../redux/action";
import { Pagination } from "./Pagination";
import SearchBar from "./SearchBar";


export default function Home() {

  const dispatch = useDispatch();

  const allPokemones = useSelector((state) => state.pokemon);
  const types = useSelector(state => state.types)
  

  const [order, setOrder] = useState("")



  //-------PAGINADO----///
  let [currentPage, setCurrentPage] = useState(1);
  const [pokemonsInPage, setPokemonsInPage] = useState(12)

  const indexOfLastPoke = currentPage * pokemonsInPage;
  const indexOfFirstPoke = indexOfLastPoke - pokemonsInPage;


  const currentPokes = allPokemones.slice(indexOfFirstPoke, indexOfLastPoke) //pokemones en la pag actual

  const paginado = (NumPag) => {
    setCurrentPage(NumPag)

  }

  const paginadoPrev = (NumPag) => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  };

  const paginadoNext = (NumPag) => {
    if (currentPage < (Math.ceil(allPokemones.length / pokemonsInPage))) setCurrentPage(currentPage + 1)
  };

  const paginadoFirs = (NumPag) => {
    setCurrentPage(currentPage = 1)
  };

  const paginadoLast = (NumPag) => {
    setCurrentPage(currentPage = (Math.ceil(allPokemones.length / pokemonsInPage)))
  }
  //----FIN PAGINADO----//

  useEffect(() => {
    dispatch(getPokemones());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])


  //function handlefilterByType (e){
  // console.log(e.target.value)
  //  dispatch(filterByType(e.target.value))
  //}




  function handleOrderByAlfabeto(e) {
    e.preventDefault()
    dispatch(orderByAlfab(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  };

  function handleOrderByHP(e) {
    e.preventDefault();
    dispatch(orderByHp(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
    //console.log(e.target.value)
  }


  function handleFilterByCreated(e) {
    e.preventDefault()
    dispatch(createdInBd(e.target.value))
  };


  //-----filter  by type
  
  

  function handleFilterType(e) {
    //e.preventDefault()
    // setClick ({
    //   ...click,
     
    dispatch(filterByType(e.target.value))
      
  }
    
  
  



  return (
    <>
      <SearchBar />

      {/* <Link to="/home">
          <button>Cargar de nuevo los pokemones</button>
        
        </Link> */}
      <div>
        Ordenar alfabeticamente
        <select onChange={(e) => handleOrderByAlfabeto(e)} name="Ordenar de forma..." id="">
          <option value="q" >---</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
      </div>

      <div>
        Ordenar por fuerza
        <select onClick={(e) => handleOrderByHP(e)} name="Ordenar de forma..." id="">
          <option value="q" >---</option>
          <option value="asc">Menos fuertes primero</option>
          <option value="des">Mas furtes primero</option>
        </select>
      </div>

      {/* <div>
        <label  >Filtrar por Tipo</label>
        <select onChange={(e) => handleFilterType(e)} name="filterType">
         <option >----</option>
          <option value="all">Todos</option>
          {types.map(t => (
            <option value={t.name}>{t.name}</option>
          ))}

        </select>
        </div>
           <ul><li>{input.types.map(t => t + " ,")} </li></ul>
      <div>
      
      </div> */}

      <div>
        Filtrar por origen
        <select onChange={(e) => handleFilterByCreated(e)} name="Ordenar_created_bd" >
          <option value="todos">Todos</option>
          <option value="api">Originales</option>
          <option value="bd">Creados</option>
        </select>
      </div>

      <div>
        Filtrar por tipo
        <select onChange={(e) => handleFilterType(e)}  name="Ordenar de tipo..." id=""  type=""  >
          <option >----</option>
          <option value="all">todos</option>
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

      <Link to={"/home/" + Math.floor(Math.random()*(allPokemones.length)) } >
        <button >Tu poke aleatorio</button>
     </Link>

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
          currentPokes.map((p) => (
            <Link to={"/home/" + p.id}>
              <Card types={p.types} createInBD={p.createInBD} name={p.name} image={p.image} />
            </Link>

          ))}
      </div>
    </>
  );
}
