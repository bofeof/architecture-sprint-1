import React from "react";
import { Link } from "react-router-dom";
import { register } from "./utils/auth";
import { useHistory } from "react-router-dom";

import "./auth-form/auth-form.css";

export default function Register() {
  const history = useHistory();

   // TODO:дописать попап и информированием
  function onRegister({ email, password }) {
    register(email, password)
      .then((res) => {
        // setTooltipStatus("success");
        // setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        // setTooltipStatus("fail");
        // setIsInfoToolTipOpen(true);
      });
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="email"
              id="email"
              className="auth-form__textfield"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-form__input">
            <input
              type="password"
              name="password"
              id="password"
              className="auth-form__textfield"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">
            Зарегистрироваться
          </button>
          <p className="auth-form__text">
            Уже зарегистрированы?{" "}
            <Link className="auth-form__link" to="/signin">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
