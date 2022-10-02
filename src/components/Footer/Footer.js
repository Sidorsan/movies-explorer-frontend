import React from "react";
const {yandexPracticumLink} = require('../Constant/Constant')
const { gitHabLink } = require("../Constant/Constant");
let date = new Date();
function Footer(props) {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__lowerPart">
        <a href={yandexPracticumLink} className="footer__lowerPart_link">
          Яндекс.Практикум
        </a>
        <a href={gitHabLink} className="footer__lowerPart_link">
          Github
        </a>
        <p className="footer__lowerPart_date">© {date.getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
