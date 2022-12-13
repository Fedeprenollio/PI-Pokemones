import React from "react";
import { Link } from "react-router-dom";
import s from "./landingPage.module.css"

export default function LandingPage() {
  return (
    <div className={s.content}>
      <h1 className={s.h1}>Bienvenidos a la pokeApp</h1>
      <Link to="/home" >
      <button className={s.btn} >Ingresar</button>
      
      </Link>     

    </div>
  );
};


