import { useRef, useState, useEffect } from "react";

import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "../styles/UserMenu.module.css";

export default function UserMenu({ newMail, setNewMail }) {
  const auth = getAuth();
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);

  const starUserFunc = () => {
    navigate("/main/userstat", {
      state: { newMail },
    });
  };

  /*  const profileFunc = () => {
    navigate1("/main/userprofile", {
      state: { userStat },
    });
  }; */
  const logOutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("logout");
        setNewMail("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate("/");
      });
  };
  const FirstLetter = newMail.slice(0, 1);
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPopUp(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  return (
    <div>
      <div className={styles.inner}>
        <div
          ref={ref}
          onClick={() => setShowPopUp(!showPopUp)}
          className={styles.ava}
        >
          {FirstLetter}
        </div>

        <div
          className={showPopUp ? styles.avaPopUpActive : styles.avaPopUpHide}
        >
          <ul>
            <li /* onClick={profileFunc} */ className={styles.avaItem}>
              <Link to={"/main/userprofile"}>Профиль</Link>
            </li>
            <li onClick={starUserFunc} className={styles.avaItem}>
              Статистика
            </li>
            <li onClick={logOutFunc} className={styles.avaItem}>
              Выйти
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
