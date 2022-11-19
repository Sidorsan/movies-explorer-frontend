import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn }) {
  let location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_backgroundColorAdd" : ""
      }`}
    >
      <Switch>
        {/* <Route exact path={["/profile", "/movies", "/saved-movies"]}> */}
        <Route>
          {loggedIn ? (
            <Navigation />
          ) : (
            <Route path="/">
              <a href="/">
                <img src={logo} alt="Логотип" className="header__logo" />
              </a>
              <Link
                className="header__link header__link_registration "
                to={"/signup"}
              >
                Регистрация
              </Link>
              <Link to={"/signin"}>
                <button className="header__link header__link_enter">
                  Войти
                </button>
              </Link>
            </Route>
          )}
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
