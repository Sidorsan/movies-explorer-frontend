import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="логотип Место" className="header__logo" />
      <Switch>
        {/* <Route path="/signup">
          <Link className="header__link" to={"/signin"}>
            Войти
          </Link>
        </Route> */}

        {/* <Route path="/signin">
          <Link className="header__link" to={"/signup"}>
            Регистрация
          </Link>
        </Route> */}
        <Route path="/">
          {/* <p className="header__link header__link_email">
            {localStorage.getItem("userEmail")}
          </p> */}
          <Link
            className="header__link header__link_registration "
            to={"/signup"}
            // onClick={props.onLogout}
          >
            Регистрация
          </Link>
          <Link
            to={"/signin"}
            // onClick={props.onLogout}
          >
            <button className="header__link header__link_enter">Войти</button>
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
