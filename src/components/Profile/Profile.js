import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import Form from "../Form/Form";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Profile = ({ onLogin, logOut }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [values, setValues] = useState({ email: "", firstName: "" });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues({ email: currentUser.email, firstName: currentUser.name });
    }
  }, [currentUser]);

  const checkFirstDataAndValid =
    isValid && ((
      (values.firstName === currentUser.name || values.firstName === ""
        ?  false
        : true)) ||
    (values.email === currentUser.email || values.email === "" ? false : true));

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]:
        target.validationMessage === "Введите данные в указанном формате."
          ? "Введеные символы не соответствуют Email"
          : target.validationMessage,
    });
    setIsValid(target.closest("form").checkValidity());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const { firstName, email } = values;
      onLogin({ firstName, email });
    }
  };
  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <Form
        name="profile"
        buttonSubmitTitle="Редактировать"
        onSubmit={handleSubmit}
        questionAboutRegistration=""
        logOut={logOut}
        linkTitle="Выйти из аккаунта"
        isValid={checkFirstDataAndValid}
      >
        <section className="form__section form__section_profile">
          {" "}
          <label className="form__input_label form__input_label_profile ">
            Имя
          </label>
          <input
            placeholder="Введите имя"
            defaultValue={currentUser.name}
            className="form__input form__input_profile"
            id="firstName"
            name="firstName"
            type="firstName"
            onChange={handleChange}
            required
            minLength="2"
            maxLength="20"
            pattern="^[a-zA-Zа-яА-ЯЁё -]+$"
          />
          <span>
            <p className="form__input_errorState form__input_errorState_profile ">
              {errors.firstName === "Введите данные в указанном формате."
                ? "Поле должно содержать только латиницу, кириллицу, пробел или дефис"
                : errors.firstName}
            </p>
          </span>
        </section>
        <section className="form__section form__section_profile">
          <label className="form__input_label form__input_label_profile">
            E-mail
          </label>
          <input
            defaultValue={currentUser.email}
            className="form__input form__input_profile"
            placeholder="Введите E-mail"
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            required
          />
          <span>
            <p className="form__input_errorState form__input_errorState_profile">
              {errors.email}
            </p>
          </span>
        </section>
      </Form>
    </section>
  );
};
export default Profile;
