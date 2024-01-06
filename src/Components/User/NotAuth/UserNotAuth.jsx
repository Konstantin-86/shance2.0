import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import styles from "./UserNotAuth.module.css";

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
        {showInner ? (
          <div className={styles.innerShow}>
            <p>Вы не авторизованны</p>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link to={"/SignUp"} className={styles.item}>
                  Регистрация
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to={"/login"} className={styles.item}>
                  Войти
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className={styles.innerHide}></div>
        )}
      </div>
    </>
  );
};

export default UserNotAuth;
