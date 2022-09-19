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
        className="form__submitButton"
        value={buttonSubmitTitle}
      >
        {buttonSubmitTitle}
      </button>


        <p className="form__questionAboutRegistration">
          {questionAboutRegistration}{" "}
          <span>
            <Link to={link} className="form__link">
              {linkTitle}
            </Link>
          </span>
        </p>

    </form>
  );
}
export default Form;
