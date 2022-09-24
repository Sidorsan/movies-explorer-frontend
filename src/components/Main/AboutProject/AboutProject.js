import React from "react";

function AboutProject(props) {
  return (
    <div className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <ul className="aboutProject__table">
        <li className="aboutProject__table_cell">
          <h3 className="aboutProject__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__description ">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="aboutProject__table_cell">
          <h3 className="aboutProject__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__description">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="aboutProject__brief">
        <div className="aboutProject__brief_column aboutProject__brief_column_colorGreen aboutProject__brief_column_size  ">
          <p className="aboutProject__brief_column_title aboutProject__brief_column_title_colorBlack ">
            1 неделя
          </p>
        </div>
        <div className="aboutProject__brief_column aboutProject__brief_column_colorGrey">
          <p className="aboutProject__brief_column_title">4 недели</p>
        </div>
      </div>
      <div className="aboutProject__brief aboutProject__brief_title">
        <div className="aboutProject__brief_column aboutProject__brief_column_size">
          <p className="aboutProject__brief_column_title aboutProject__brief_column_title_colorGray">
            Back-end
          </p>
        </div>
        <div className="aboutProject__brief_column">
          <p className="aboutProject__brief_column_title aboutProject__brief_column_title_colorGray">
            Front-end
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
