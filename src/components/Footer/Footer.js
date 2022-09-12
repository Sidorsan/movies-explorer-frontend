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
      <a href={yandexPracticumLink} className="footer__link">
        Яндекс.Практикум
      </a>
      <a href={gitHabLink} className="footer__link">
        Github
      </a>
      <p className='footer__date'>© {date.getFullYear()}</p>
    </footer>
  );
}

export default Footer;
