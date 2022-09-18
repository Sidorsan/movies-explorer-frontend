import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

const Login = ({ onLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   if (!email || !password) {
  //     return;
  //   }
  //   onLogin({ email, password });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password, email } = data;
    console.log(data);
  };

  return (
    <Form
      name="register"
      title="Рады видеть!"
      buttonSubmitTitle="Войти"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="register">
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
            })}
          />
          <span>
            {errors?.email?.type === "required" && (
              <p className="errorState">Это поле необходимо заполнить</p>
            )}
          </span>
        </section>
        <section className="form__section">
          <label className="form__input_label">Пароль</label>
          <input
            className="form__input"
            placeholder="Пароль"
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
          {errors?.password?.type === "required" && (
            <p className="errorState">Это поле необходимо заполнить</p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="errorState">Пароль не может быть меньше 8 символов</p>
          )}
        </section>
      </div>
    </Form>
  );
};
export default Login;
