import React from "react";
import logo from "../../../images/pic__COLOR_landing-logo.svg";

function NavTab(props) {
  return (
    <div className="promo">
      <img src={logo} alt="логотип лендинг" className="promo__logo" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </div>
  );
}

export default NavTab;
