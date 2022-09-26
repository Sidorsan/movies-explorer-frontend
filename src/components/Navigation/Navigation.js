import logo from "../../images/logoDiploma.svg";
import accaunt from "../../images/accaunt.svg";

function Navigation(props) {
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
            <a className="navigation__panel_menu_link" href="/movies">
              Фильмы
            </a>
          </li>
          <li className="navigation__panel_menu_links">
            <a className="navigation__panel_menu_link" href="/saved-movies">
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <div className="navigation__panel_accaunt">
          <a className="navigation__panel_accaunt_link" href="/profile">
            Аккаунт
          </a>
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
