import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import MyBackButton from "./UI/MyBackButton/MyBackButton";

import styles from "../styles/UserProfile.module.css";

import ava from "../assets/images/icons/profileAvatar.png";

const UserProfile = () => {
  const [userStat, setUserStat] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStat(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  console.log(typeof userStat.metadata.creationTime);
  return (
    <>
      <div className={styles.innerUserProfile}>
        <div className={styles.userContainer}>
          <div className={styles.box}>
            <img className={styles.avaImg} src={ava} alt="ava" />
          </div>
          <MyBackButton />
        </div>
      </div>
      Профиль
      <div>
        <p>Дата создания аккаунта {userStat.metadata.creationTime}</p>
        <p>Последний вход в аккаунт {userStat.metadata.lastSignInTime}</p>
        <p>
          Почта подтверждена {userStat.metadata.emailVerified ? "да" : "нет"}
        </p>
      </div>
    </>
  );
};

export default UserProfile;
