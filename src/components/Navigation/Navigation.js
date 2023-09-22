import logo from "../../images/logoDiploma.svg";
import accaunt from "../../images/accaunt.svg";
import { useLocation, Link } from "react-router-dom";
function Navigation(props) {
  let location = useLocation();
  return (
    <div className="navigation">
      <a href="/">
        <img src={logo} alt="Логотип" className="navigation__logo" />
      </a>
      <input className="navigation__checkbox" type="checkbox" name="" id="" />
      <div className="navigation__hamburger-lines">
        <span className="navigation__hamburger-lines_line navigation__hamburger-lines_line1"></span>
        <span className="navigation__hamburger-lines_line navigation__hamburger-lines_line2"></span>
        <span className="navigation__hamburger-lines_line navigation__hamburger-lines_line3"></span>
      </div>
      <div className="navigation__panel">
        <ul className="navigation__panel_menu">
          <li className="navigation__panel_menu_links">
            <a className="navigation__panel_menu_link" href="/">
              Главная
            </a>
          </li>
          <li className="navigation__panel_menu_links">
            <Link className="navigation__panel_menu_link" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="navigation__panel_menu_links">
            <Link className="navigation__panel_menu_link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="navigation__panel_accaunt">
          <Link className="navigation__panel_accaunt_link" to="/profile">
            Аккаунт
          </Link>
          <img
            src={accaunt}
            alt="Аккаунт"
            className="navigation__panel_accaunt_logo"
          />
        </div>
      </div>
    </div>
  );
}
export default Navigation;
