import React from "react";
import { Link } from "react-router-dom";
import s from "./card.module.css";

export default function Card({ name, image, createInBD, types, id }) {
  return (
    <div className={s.container}>
      <h2 className={s.name}>{name}</h2>
      <Link to={"/home/" + id}>
        <div>
          <img
            className={s.img}
            src={
              image
                ? image
                : "https://programacion.net/files/article/20161110041116_image-not-found.png"
            }
            alt="pokemones"
          />
        </div>
      </Link>
      <h3 className={s.tipo}>Tipo:</h3>
      {createInBD === true
        ? types?.map((t, i) => (
            <h3 className={s.tipos} key={i}>
              {Object.values(types[i])}{" "}
            </h3>
          ))
        : types?.map((p, i) => (
            <h3 className={s.tipos} key={i}>
              {p}
            </h3>
          ))}
    </div>
  );
}
