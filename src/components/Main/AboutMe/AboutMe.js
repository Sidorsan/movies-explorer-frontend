import React from "react";
import photoStudent from "../../../images/photoStudent.jpg";
const { gitHabLink } = require("../../Constant/Constant");

function AboutMe(props) {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__info">
        <img
          src={photoStudent}
          className="aboutMe__photo"
          alt="Фото студента"
        ></img>
        <div className="aboutMe__info_text">
          <h2 className="aboutMe__info_text_title">Александр</h2>
          <h3 className="aboutMe__info_text_subtitle">
            Фронтенд-разработчик, 42 года
          </h3>
          <p className="aboutMe__info_text_description">
            Я&nbsp;родился в&nbsp;Новокузнецке, закончил факультет автоматизации
            СИБГИУ. Запустил и&nbsp;десять лет отработал главным инженером
            на&nbsp;заводе по&nbsp;производству напитков. Решил сменить
            профессию и&nbsp;стандартный уклад жизни. Прошел курс в&nbsp;Яндекс
            Практикуме. Хочу работать удаленно.
          </p>
          <a href={gitHabLink} className="aboutMe__info_text_githabLink">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
