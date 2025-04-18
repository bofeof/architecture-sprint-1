import React, { useContext } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
// import { CurrentUserContext } from "sharedLib/CurrentUserContext";
import logoPath from "../../../shared/styles/images/logo.svg";

import "./index.css";

// временное решение, чтобы модуль не падал без подключенного контекста
let CurrentUserContext;
try {
  CurrentUserContext =
    require("sharedLib/CurrentUserContext").CurrentUserContext;
} catch (e) {
  console.warn("CurrentUserContext не найден, будет использован fallback.");
  CurrentUserContext = React.createContext({
    setCurrentUser: () => {},
    email: "",
  });
}

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
export default function Header() {
  if (CurrentUserContext === undefined) {
    CurrentUserContext = React.createContext({
      setCurrentUser: () => {},
      email: "",
    });
  }

  const { setCurrentUser, email } = useContext(CurrentUserContext);

  const history = useHistory();

  function handleSignOut() {
    onSignOut();
  }

  // TODO: Дописать
  function onSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    history.push("/signin");
  }

  return (
    <header className="header page__section">
      <img
        src={logoPath}
        alt="Логотип проекта Mesto"
        className="logo header__logo"
      />
      <Switch>
        <Route exact path="/">
          <div className="header__wrapper">
            <p className="header__user">{email || "john.doe@jd.com"}</p>
            <button className="header__logout" onClick={handleSignOut}>
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/signup">
          <Link className="header__auth-link" to="signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__auth-link" to="signup">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
