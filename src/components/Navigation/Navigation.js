import logo from "../../images/logoDiploma.svg";
import accaunt from "../../images/accaunt.svg";

function Navigation(props) {
  return (
    <div class="nav-container">
      <a href="/">
        <img src={logo} alt="Логотип" className="nav-container__logo" />
      </a>
      <input class="checkbox" type="checkbox" name="" id="" />
      <div class="hamburger-lines">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
      </div>

      <ul className="header__menuItems">
        <li className="header__menuItems_links">
          <a className="header__menuItems_link" href="/">
            Главная
          </a>
        </li>
        <li className="header__menuItems_links">
          <a className="header__menuItems_link" href="#">
            Фильмы
          </a>
        </li>
        <li className="header__menuItems_links">
          <a className="header__menuItems_link" href="#">
            Сохранённые фильмы
          </a>
        </li>
        <div className="header__menuItems-accaunt">
          <a className="header__menuItems_linkAccaunt" href="#">
            Аккаунт
          </a>
          <img src={accaunt} alt="Аккаунт" className="accaunt__logo" />
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
