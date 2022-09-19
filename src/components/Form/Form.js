import React from "react";
import { Link } from "react-router-dom";
function Form({
  name,
  onSubmit,
  children,
  buttonSubmitTitle,
  questionAboutRegistration,
  link,
  linkTitle,
}) {
  return (
    <form
      className={`form form_${name}`}
      name={`form_${name}`}
      onSubmit={onSubmit}
    >
      {children}
      <button
        type="submit"
        // onSubmit={handleSubmit}
        className={`form__submitButton form__submitButton_${name}`}
        value={buttonSubmitTitle}
      >
        {buttonSubmitTitle}
      </button>

      <p className="form__questionAboutRegistration">
        {questionAboutRegistration}{" "}
        <span>
          <Link to={link} className={`form__link form__link_${name}`}>
            {linkTitle}
          </Link>
        </span>
      </p>
    </form>
  );
}
export default Form;
