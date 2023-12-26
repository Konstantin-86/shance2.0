import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import styles from "./Styles/UserNotAuth.module.css";

const UserNotAuth = () => {
  const [showInner, setShowInner] = useState(false);

  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowInner(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  return (
    <>
      <div
        ref={ref}
        onClick={() => setShowInner(!showInner)}
        className={styles.box}
      >
        ?
        {showInner && (
          <div className={styles.inner}>
            <p>Вы не авторизованны</p>

            <ul className={styles.list}>
              <Link to={"/SignUp"} className={styles.item}>
                Регистрация
              </Link>
              <Link to={"/login"} className={styles.item}>
                Войти
              </Link>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default UserNotAuth;
