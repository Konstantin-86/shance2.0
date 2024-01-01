import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import login from "../../../assets/images/icons/login.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleError, setHandleError] = useState(false);

  const handleSubmit = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/main");
      })
      .catch((error) => {
        console.log(auth);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setHandleError(true);
        setTimeout(() => {
          setHandleError(false);
        }, 2000);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.textTitle}> Вход в акктуан </p>
        <div
          className={handleError ? styles.errorTextShow : styles.errorTextHide}
        >
          Ошибка логина или пароля
        </div>
        <div className={styles.contentBox}>
          <img className={styles.loginImg} src={login} alt="login" />
          <div className={styles.innerLogin}>
            <input
              className={email ? styles.loginInpt : styles.loginInptEmpty}
              id="mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="mail">Почта *</label>
          </div>
          <div className={styles.innerLogin}>
            {" "}
            <input
              className={
                password ? styles.loginInptPass : styles.loginInptPassEmpty
              }
              type="text"
              value={password}
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="pass">Пароль *</label>
          </div>

          <button className={styles.signInButton} onClick={handleSubmit}>
            ВОЙТИ
          </button>
        </div>

        <p className={styles.text}>
          Нет аккаунта? <NavLink to="/signup">Зарегистрироваться</NavLink>
        </p>
      </div>
    </>
  );
};

export default Login;
