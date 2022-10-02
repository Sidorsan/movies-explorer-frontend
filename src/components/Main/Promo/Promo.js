import React from "react";
import logo from "../../../images/pic__COLOR_landing-logo.svg";


function Promo(props) {
  return (
    <section className="promo">
      <img src={logo} alt="логотип лендинг" className="promo__logo" />
      <h1 className="promo__title">
        Учебный проект студента факультета <nobr>Веб-разработки</nobr>
      </h1>
    </section>
  );
}

export default Promo;
