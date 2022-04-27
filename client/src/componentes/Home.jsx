import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getPokemones,
  createdInBd,
  orderByAlfab,
  orderByHp,
  getTypes,
  filterByType,
} from "../redux/action";
import Card from "./Card";
import { Pagination } from "./Pagination";
import SearchBar from "./SearchBar";
import s from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const allPokemones = useSelector((state) => state.pokemon);

  const types = useSelector((state) => state.types);

  const [order, setOrder] = useState("");

  //-------PAGINADO----///
  let [currentPage, setCurrentPage] = useState(1);
  const [pokemonsInPage, setPokemonsInPage] = useState(12);

  const indexOfLastPoke = currentPage * pokemonsInPage;
  const indexOfFirstPoke = indexOfLastPoke - pokemonsInPage;

  let currentPokes = allPokemones.slice(indexOfFirstPoke, indexOfLastPoke);

  function handlePokeInPag(e) {
    setPokemonsInPage(e.target.value);
  }

  const paginado = (NumPag) => {
    setCurrentPage(NumPag);
  };

  const paginadoPrev = (NumPag) => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginadoNext = (NumPag) => {
    if (currentPage < Math.ceil(allPokemones.length / pokemonsInPage))
      setCurrentPage(currentPage + 1);
  };

  const paginadoFirs = (NumPag) => {
    setCurrentPage((currentPage = 1));
  };

  const paginadoLast = (NumPag) => {
    setCurrentPage(
      (currentPage = Math.ceil(allPokemones.length / pokemonsInPage))
    );
  };
  //----FIN PAGINADO----//

  useEffect(() => {
    dispatch(getPokemones());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleOrderByAlfabeto(e) {
    e.preventDefault();
    dispatch(orderByAlfab(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByHP(e) {
    e.preventDefault();
    dispatch(orderByHp(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    //console.log(e.target.value)
  }

  function handleFilterByCreated(e) {
    e.preventDefault();
    dispatch(createdInBd(e.target.value));
    setCurrentPage(1);
  }

  //-----filter  by type

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  }

  function handleRefresh(e) {
    
    dispatch(getPokemones());
  }

  return (
    allPokemones && (
      <div className={s.container_main}>
        <SearchBar />

        <div className={s.conteiner}>
          <div className={s.conteiner_order}>
            <div>
              <label className={s.label} htmlFor="">
                Ordenar alfabeticamente
              </label>
              <select
                className={s.select}
                onChange={(e) => handleOrderByAlfabeto(e)}
                name="Ordenar de forma..."
                id=""
              >
                <option disabled selected="selected" value="q">---</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
              </select>
            </div>

            <div>
              <label className={s.label} htmlFor="">
                Ordenar por fuerza
              </label>
              <select
                className={s.select}
                onChange={(e) => handleOrderByHP(e)}
                name="Ordenar de forma..."
                id=""
              >
                <option disabled selected="selected" value="q">---</option>
                <option value="asc">Menos fuertes primero</option>
                <option value="des">Mas furtes primero</option>
              </select>
            </div>
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

          <div className={s.conteiner_filter}>
            <div>
              <label className={s.label} htmlFor="">
                Filtrar por origen
              </label>
              <select
                className={s.select}
                onChange={(e) => handleFilterByCreated(e)}
                name="Ordenar_created_bd"
              >
                <option value="todos">Todos</option>
                <option value="api">Originales</option>
                <option value="bd">Creados</option>
              </select>
            </div>

            <div>
              <label className={s.label} htmlFor="">
                Filtrar por tipo
              </label>
              <select
                className={s.select}
                onChange={(e) => handleFilterType(e)}
                name="Ordenar de tipo..."
                id=""
                type=""
              >
                {/* <option >----</option> */}
                <option value="all">Todos</option>
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
          </div>
        </div>

        {allPokemones.length > 0 && (
          <div>
            <Link
              className={s.link}
              to={"/home/" + Math.ceil(Math.random() * 151)}
            >
              <button className={s.aleatorio}>Tu poke aleatorio</button>
            </Link>

            <h3>Pagina {currentPage} </h3>
          </div>
        )}

        {allPokemones.length > 0 && (
          <button className={s.aleatorio} onClick={(e) => handleRefresh(e)}>
            Mostrar todos / borrar filtros
          </button>
        )}

           {
             allPokemones.length>0 &&
             <Pagination
             pokemonsInPage={pokemonsInPage}
             allPokemones={allPokemones.length}
             paginado={paginado}
             paginadoPrev={paginadoPrev}
             paginadoNext={paginadoNext}
             paginadoFirs={paginadoFirs}
             paginadoLast={paginadoLast}
             handlePokeInPag={handlePokeInPag}
           />

           } 

       

        <div>
          {allPokemones.length > 0 ? (
            currentPokes.map((p, a) => {
              return (
                <div key={a} className={s.cards}>
                  <Card
                    key={p.id}
                    types={p.types}
                    createInBD={p.createInBD}
                    name={p.name}
                    image={p.image}
                    id={p.id}
                  />
                </div>
              );
            })
          ) : (
            <h2>Cargando...</h2>
          )}
        </div>
      </div>
    )
  );
}
