import React from "react";
import Arrow from "../../../images/arrow.svg";
const {staticWebSiteLink} = require("../../Constant/Constant");
const {adaptiveWebSiteLink} = require("../../Constant/Constant");
const {singlePageApplicationLink} = require("../../Constant/Constant");


function Portfolio(props) {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link_blocks">
        <li className="portfolio__link_block">
          <h3 className="portfolio__link_block_title"> Статичный сайт</h3>
          <a href={staticWebSiteLink} className="portfolio__link">
            <img
              src={Arrow}
              alt="Стрелка"
              className="portfolio__link_arrow"
            ></img>
          </a>
        </li>
        <li className="portfolio__link_block">
          <h3 className="portfolio__link_block_title"> Адаптивный сайт</h3>
          <a href={adaptiveWebSiteLink} className="portfolio__link">
            <img
              src={Arrow}
              alt="Стрелка"
              className="portfolio__link_arrow"
            ></img>
          </a>
        </li>
        <li className="portfolio__link_block">
          <h3 className="portfolio__link_block_title">
            Одностраничное приложение
          </h3>
          <a href={singlePageApplicationLink} className="portfolio__link">
            <img
              src={Arrow}
              alt="Стрелка"
              className="portfolio__link_arrow"
            ></img>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
