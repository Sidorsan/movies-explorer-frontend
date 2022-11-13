import React from "react";
import { Link, useLocation } from "react-router-dom";

function Form({
  name,
  onSubmit,
  children,
  buttonSubmitTitle,
  questionAboutRegistration,
  link,
  linkTitle,
  isValid,
  logOut,
}) {
  let location = useLocation();

  return (
    <form
      className={`form form__${name}`}
      name={`form_${name}`}
      onSubmit={onSubmit}
    >
      {children}
      <button
        type="submit"
        className={`form__submitButton form__submitButton_${name} ${
          !isValid ? "form__submitButton_notActive" : ""
        }`}
        value={buttonSubmitTitle}
        disabled={!isValid ? true : false}
      >
        {buttonSubmitTitle}
      </button>

      <p
        className={`form__questionAboutRegistration form__questionAboutRegistration_${name}`}
      >
        {questionAboutRegistration}{" "}
        <span>
          {location.pathname === "/profile" ? (
            <button
              onClick={logOut}
              className={`form__link form__link_${name}`}
            >
              {linkTitle}
            </button>
          ) : (
            <Link to={link} className={`form__link form__link_${name}`}>
              {linkTitle}
            </Link>
          )}
        </span>
      </p>
    </form>
  );
}
export default Form;
