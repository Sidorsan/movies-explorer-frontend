import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
const Profile = ({ onLogin }) => {
  //  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   if (!email || !password) {
  //     return;
  //   }
  //   onLogin({ email, password });
  // };

  const [data, setData] = useState({
    email: "",
    firstName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { firstName, email } = data;
    console.log(data);
  };
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

      <Form
        name="profile"
        buttonSubmitTitle="Редактировать"
        onSubmit={handleSubmit(onSubmit)}
        questionAboutRegistration=""
        link="#"
        linkTitle="Выйти из аккаунта"
      >
        <section className="form__section form__section_profile">
          {" "}
          <label className="form__input_label form__input_label_profile ">
            Имя
          </label>
          <input
            placeholder="Введите имя"
            className="form__input form__input_profile"
            id="firstName"
            name="firstName"
            type="firstName"
            onChange={handleChange}
            {...register("firstName", {
              required: true,
            })}
          />
          <span>
            {errors?.firstName?.type === "required" && (
              <p className="form__input_errorState form__input_errorState_profile">
                Это поле необходимо заполнить
              </p>
            )}
            {errors?.firstName?.type === "maxLength" && (
              <p className="form__input_errorState form__input_errorState_profile">
                Имя не должно быть длиннее 20 символов
              </p>
            )}
            {errors?.firstName?.type === "minLength" && (
              <p className="form__input_errorState form__input_errorState_profile">
                Имя не должно быть меньше 2 символов
              </p>
            )}
          </span>
        </section>
        <section className="form__section form__section_profile">
          <label className="form__input_label form__input_label_profile">
            E-mail
          </label>
          <input
            className="form__input form__input_profile"
            placeholder="Введите E-mail"
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            {...register("email", {
              required: true,
              minLength: 8,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="form__input_errorState form__input_errorState_profile">
              Это поле необходимо заполнить
            </p>
          )}
        </section>
      </Form>
    </div>
  );
};
export default Profile;
