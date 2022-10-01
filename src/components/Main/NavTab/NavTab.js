import React from "react";

function NavTab(props) {
  return (
    <nav className='nav'>
      <ul className="navTab">
        <li>
          <a href="#aboutProject" className="navTab__links">
            О проекте
          </a>
        </li>
        <li>
          <a href="#techs" className="navTab__links">
            Технологии
          </a>
        </li>
        <li>
          <a href="#aboutMe" className="navTab__links">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
