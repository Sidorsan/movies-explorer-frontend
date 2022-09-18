import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
function Form({
  name,
  title,
  onSubmit,
  children,
  buttonSubmitTitle,
}) {
  return (
    <div className={`form form__${name}`}>
      <a href="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </a>
      <p className="register__welcome">{`${title}`}</p>
      <form
        className={`form form_${name}`}
        name={`form_${name}`}
        onSubmit={onSubmit}

      >
        {children}
        <button
          type="submit"
          // onSubmit={handleSubmit}
          className="form__submitButton"
          value={buttonSubmitTitle}
        >
          {buttonSubmitTitle}
        </button>

        <div className="register__signin">
          <p>
            Ещё не зарегистрированы?{" "}
            <span>
              <Link to="signup" className="register__signin_link">
                Регистрация
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Form;
