import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

//хук управления формой
// export function useForm() {
//   const [values, setValues] = React.useState({});

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     setValues({...values, [name]: value});
//   };

//   return {values, handleChange, setValues};
// }

// //хук управления формой и валидации формы
// export function useFormWithValidation() {
//   const [values, setValues] = React.useState({});
//   const [errors, setErrors] = React.useState({});
//   const [isValid, setIsValid] = React.useState(false);

//   const handleChange = (event) => {
//     const target = event.target;
//     const name = target.name;
//     const value = target.value;
//     setValues({...values, [name]: value});
//     setErrors({...errors, [name]: target.validationMessage });
//     setIsValid(target.closest("form").checkValidity());
//   };

//   return { values, handleChange, errors, isValid, resetForm };
// }

// const Register = ({ onRegister }) => {
const Register = ({ onRegister }) => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = React.useState(false);
  console.log(isValid);

  const resetForm = useCallback(
    (newIsValid = false) => {
      setIsValid(newIsValid);
    },
    [setIsValid]
  );

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(e);
    setIsValid(target.closest("form").checkValidity());
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   {
  //     const { password, email, firstName } = data;
  //     // onRegister({ password, email, firstName });
  //   }

  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password, email, firstName } = data;
    onRegister({ password, email, firstName });
  };

  return (
    <section className="register">
      <div className="register__header">
        <a href="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </a>

        <h2 className="register__title">Добро пожаловать!</h2>
      </div>

      <Form
        name="register"
        buttonSubmitTitle="Зарегистрироваться"
        onSubmit={handleSubmit(onSubmit)}
        questionAboutRegistration="Уже зарегистрированы?"
        link="signin"
        linkTitle="Войти"
      >
        <section className="form__section">
          <label className="form__input_label">Имя</label>
          <input
            className="form__input"
            placeholder="Введите имя"
            id="firstName"
            name="firstName"
            // value={data.firstName}
            onChange={handleChange}
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Zа-яА-ЯЁё -]+$/,
            })}
          />
          <span>
            {errors?.firstName?.type === "required" && (
              <p className="form__input_errorState">
                Это поле необходимо заполнить
              </p>
            )}
            {errors?.firstName?.type === "minLength" && (
              <p className="form__input_errorState">
                Имя не должно быть не короче 2 символов
              </p>
            )}
            {errors?.firstName?.type === "maxLength" && (
              <p className="form__input_errorState">
                Имя не должно быть длиннее 20 символов
              </p>
            )}
            {errors?.firstName?.type === "pattern" && (
              <p className="form__input_errorState">
                Поле должно содержать только латиницу, кириллицу, пробел или
                дефис
              </p>
            )}
          </span>
        </section>

        <section className="form__section">
          {" "}
          <label className="form__input_label">E-mail</label>
          <input
            placeholder="Введите E-mail"
            className="form__input"
            id="email"
            name="email"
            type="email"
            // value={data.email}
            onChange={handleChange}
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          <span>
            {errors?.email?.type === "required" && (
              <p className="form__input_errorState">
                Это поле необходимо заполнить
              </p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="form__input_errorState">
                Это поле должно содержать Email
              </p>
            )}
          </span>
        </section>
        <section className="form__section">
          <label className="form__input_label">Пароль</label>
          <input
            placeholder="Введите пароль"
            className="form__input"
            id="password"
            name="password"
            type="password"
            // value={data.password}
            onChange={handleChange}
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          <span>
            {errors?.password?.type === "required" && (
              <p className="form__input_errorState">
                Это поле необходимо заполнить
              </p>
            )}
            {errors?.password?.type === "minLength" && (
              <p className="form__input_errorState">
                Пароль не может быть меньше 8 символов
              </p>
            )}
          </span>
        </section>
      </Form>
    </section>
  );
};

export default Register;
