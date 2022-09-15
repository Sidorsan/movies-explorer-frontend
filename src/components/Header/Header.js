import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import menu from "../../images//menu.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  let location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_backgroundColorAdd" : ""
      }`}
    >
      <a href="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </a>
      <Switch>
        <Route path="/profile">
          {/* <Link className="header__link" to={"/navigation"}> */}
            <nav>
              <div class="navbar">
                <div class="container nav-container">
                  <input class="checkbox" type="checkbox" name="" id="" />
                  <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                  </div>
                  <div class="logo">
                    <h1>Navbar</h1>
                  </div>
                  <div class="menu-items">
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">about</a>
                    </li>
                    <li>
                      <a href="#">blogs</a>
                    </li>
                    <li>
                      <a href="#">portfolio</a>
                    </li>
                    <li>
                      <a href="#">contact</a>
                    </li>
                  </div>
                </div>
              </div>
            </nav>
            {/* <img src={menu} alt="Меню" className="header__menu" /> */}
          {/* </Link> */}
        </Route>

        <Route path="/">
          <Link
            className="header__link header__link_registration "
            to={"/signup"}
          >
            Регистрация
          </Link>
          <Link to={"/signin"}>
            <button className="header__link header__link_enter">Войти</button>
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
