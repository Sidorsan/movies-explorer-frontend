import React from "react";
import photoStudent from "../../../images/photoStudent.jpg";
const {gitHabLink} = require("../../Constant/Constant")

function AboutMe(props) {
  return (
    <div className="aboutMe" id="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <img
        src={photoStudent}
        className="aboutMe__photo"
        alt="Фото студента"
      ></img>
      <div className="aboutMe__info">
        <h2 className="aboutMe__info_title">Александр</h2>
        <h3 className="aboutMe__info_subtitle">
          Фронтенд-разработчик, 42 года
        </h3>
        <p className="aboutMe__info_description">
          Я&nbsp;родился и&nbsp;живу в&nbsp;Новокузнецке, закончил факультет
          автоматизации СИБГИУ. Я&nbsp;люблю экстремальный отдых, получать
          адреналин. Работаю главным инженером на&nbsp;заводе. Решил сменить
          профессию и&nbsp;уйти на&nbsp;удаленку. Прошел курс в&nbsp;Яндекс
          Практикуме.
        </p>
        <a
          href={gitHabLink}
          className="aboutMe__info_githabLink"
        >
          Github
        </a>
      </div>
    </div>
  );
}

export default AboutMe;
