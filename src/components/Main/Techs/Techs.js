import React from "react";

function Techs(props) {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>

      <p className="techs__description">
        На&nbsp;курсе <nobr>веб-разработки</nobr> мы&nbsp;освоили технологии,
        которые применили в&nbsp;дипломном проекте.
      </p>
      <ul className="techs__grid_container">
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">HTML</p>
        </li>
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">CSS</p>
        </li>
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">JS</p>
        </li>
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">React</p>
        </li>
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">Git</p>
        </li>
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">Express.js</p>
        </li>
        <li className="techs__grid_container_element">
          <p className="techs__grid_container_element_item">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
