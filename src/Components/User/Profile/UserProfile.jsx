import MyBackButton from "../../UI/MyBackButton/MyBackButton";

import styles from "./UserProfile.module.css";

import ava from "../../../assets/images/icons/profileAvatar.png";

const UserProfile = () => {
  return (
    <>
      <div className={styles.innerUserProfile}>
        <div className={styles.userContainer}>
          <div className={styles.box}>
            <img className={styles.avaImg} src={ava} alt="ava" />
          </div>
          <MyBackButton />

          <div>
            <p>
              Дата создания аккаунта {/* {userStat.metadata.creationTime} */}
            </p>
            <p>
              Последний вход в аккаунт{" "}
              {/* {userStat.metadata.lastSignInTime} */}
            </p>
            <p>
              Почта подтверждена{" "}
              {/* {userStat.metadata.emailVerified ? "да" : "нет"} */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
