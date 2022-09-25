import logo from "../../images/logoDiploma.svg";
import accaunt from "../../images/accaunt.svg";

function Navigation(props) {
  return (
    <div className="navigation">
      <a href="/">
        <img src={logo} alt="Логотип" className="navigation__logo" />
      </a>
      <input className="checkbox" type="checkbox" name="" id="" />
      <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>

      <ul className="header__menuItems">
        <li className="header__menuItems_links">
          <a className="header__menuItems_link" href="/">
            Главная
          </a>
        </li>
        <li className="header__menuItems_links">
          <a className="header__menuItems_link" href="/movies">
            Фильмы
          </a>
        </li>
        <li className="header__menuItems_links">
          <a className="header__menuItems_link" href="/saved-movies">
            Сохранённые фильмы
          </a>
        </li>
        <div className="header__menuItems-accaunt">
          <a className="header__menuItems_linkAccaunt" href="/profile">
            Аккаунт
          </a>
          <img src={accaunt} alt="Аккаунт" className="accaunt__logo" />
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
