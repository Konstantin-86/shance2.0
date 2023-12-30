import MyBackButton from "../../UI/MyBackButton/MyBackButton";

import { useLocation } from "react-router-dom";

import styles from "./UserProfile.module.css";

import ava from "../../../assets/images/icons/profileAvatar.png";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [creationAccauntDate, setCreationAccauntDate] = useState("");
  const [lastSignInAcc, setLastSignInAcc] = useState("");
  const [emailIsVerified, setEmailIsVerified] = useState("");
  convertToCyrillicDate(lastSignInAcc);
  const local = useLocation();
  useEffect(() => {
    if (local.state == null) {
      return;
    } else {
      setCreationAccauntDate(
        convertToCyrillicDate(local.state.creationAccauntDate)
      );
      setLastSignInAcc(convertToCyrillicDate(local.state.lastSignInAcc));
      setEmailIsVerified(local.state.emailIsVerified);
    }
  }, []);
  function convertToCyrillicDate(dateString) {
    const months = {
      Jan: "Января",
      Feb: "Февраля",
      Mar: "Марта",
      Apr: "Апреля",
      May: "Мая",
      Jun: "Июня",
      Jul: "Июля",
      Aug: "Августа",
      Sep: "Сенября",
      Oct: "Октября",
      Nov: "Ноября",
      Dec: "Декабря",
    };
    const date = new Date(dateString);
    const month = months[dateString.substr(8, 3)];
    const time = dateString.substr(11, 8);
    const timezone = dateString.substr(20, 2);

    return ` ${date.getDate()} ${month}${time}:${timezone} `;
  }

  return (
    <>
      <div className={styles.innerUserProfile}>
        <div className={styles.userContainer}>
          <div className={styles.box}>
            <img className={styles.avaImg} src={ava} alt="ava" />
          </div>
          <MyBackButton />

          <div>
            <p>Дата создания аккаунта {creationAccauntDate}</p>
            <p>Последний вход в аккаунт {lastSignInAcc}</p>
            <p>Почта подтверждена {emailIsVerified ? "да" : "нет"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
