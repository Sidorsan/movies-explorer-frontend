import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "../../../images/pic__COLOR_landing-logo.svg";
import { Link } from "react-router-dom";

function Promo(props) {
  return (
    <div className="promo">
      <img src={logo} alt="логотип лендинг" className="promo__logo" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </div>
  );
}

export default Promo;
