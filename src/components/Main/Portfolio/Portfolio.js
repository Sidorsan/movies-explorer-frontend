import React from "react";
import Arrow from "../../../images/arrow.svg";
const { staticWebSiteLink } = require("../../Constant/Constant");
const { adaptiveWebSiteLink } = require("../../Constant/Constant");
const { singlePageApplicationLink } = require("../../Constant/Constant");

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link_blocks">
        <li className="portfolio__link_block">
          <a
            href={staticWebSiteLink}
            target="_ blank"
            className="portfolio__link"
          >
            <h3 className="portfolio__link_title"> Статичный сайт</h3>
            <img
              src={Arrow}
              alt="Стрелка"
              className="portfolio__link_arrow"
            ></img>
          </a>
        </li>
        <li className="portfolio__link_block">
          <a
            href={adaptiveWebSiteLink}
            target="_ blank"
            className="portfolio__link"
          >
            <h3 className="portfolio__link_title"> Адаптивный сайт</h3>
            <img
              src={Arrow}
              alt="Стрелка"
              className="portfolio__link_arrow"
            ></img>
          </a>
        </li>
        <li className="portfolio__link_block">
          <a
            href={singlePageApplicationLink}
            target="_ blank"
            className="portfolio__link"
          >
            <h3 className="portfolio__link_title">
              Одностраничное приложение
            </h3>
            <img
              src={Arrow}
              alt="Стрелка"
              className="portfolio__link_arrow"
            ></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
