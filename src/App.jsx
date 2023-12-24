import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./styles//App.module.css";

function App() {
  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/main");
      } else {
        navigate("/");
        setTimeout(() => {
          setShowTitle(true);
        }, 500);
      }
    });
  }, []);
  return (
    <>
      <div className={styles.innerApp}>
        <div className={styles.appContainer}>
          {/* <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
          <div className={styles.line4}></div> */}
          <h1 className={showTitle ? styles.titleActive : styles.titleHide}>
            {" "}
            ШАНС 2.0
          </h1>
          <div className={styles.InnerButtons}>
            <Link to={"SignUp/"}>
              <div className={styles.singUpButton}>Регистрация</div>
            </Link>
            <Link to={"login/"}>
              <div className={styles.loginButton}>Войти</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
