import { useEffect, useState } from "react";

import axios from "axios";
import { useLocation, Link } from "react-router-dom";

import MyBackButton from "../../UI/MyBackButton/MyBackButton";
import MyButton from "../../UI/MyButton/MyButton";

import styles from "./UserStatistic.module.css";

import deleteIcon from "../../../assets/images/icons/delete.png";

const UserStatistic = () => {
  const local = useLocation();
  const [stat, setStat] = useState([]);
  const [popUpBundle, setPopUpBundle] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState(0);
  const [currentIndexToDelete, setCurrentIndexToDelete] = useState(0);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if (local.state == null) return setAuth(true);
    const newMail = local.state.newMail;

    axios
      .get(`https://c443eaf7af5a8981.mokky.dev/results?name=${newMail}`)
      .then((res) => {
        setStat(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const clickOnBtn = () => {
    setStat(stat.filter((_item, indx) => indx !== currentIndexToDelete));
    setPopUpBundle(false);
    axios
      .delete(`https://c443eaf7af5a8981.mokky.dev/results/${currentIdToDelete}`)
      .then((res) => console.log("Удалено", res))
      .catch((e) => {
        console.log(e);
      });
  };
  const clickOnBtnOff = () => {
    setPopUpBundle(false);
  };
  const clickOnDeleteButton = (id, indx) => {
    setCurrentIndexToDelete(indx);
    setCurrentIdToDelete(id);
    setPopUpBundle(true);
  };

  stat.map((item) => {
    if (item.saveTime > 60) {
      const minutes = Math.floor(item.saveTime / 60);
      let remainingSeconds = item.saveTime % 60;
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      return (item.saveTime = `${minutes}:${remainingSeconds}`);
    }
  });
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.container}>
          <h3 className={styles.title}>Статистика</h3>
          <MyBackButton />
          <div className={styles.titleTable}>
            <p className={styles.itemTable1}>№</p>
            <p className={styles.itemTable2}>Программа</p>
            <p className={styles.itemTable3}>Правильных ответов</p>
            <p className={styles.itemTable4}>Время прохождения</p>
            <p className={styles.itemTable5}>Дата прохождения</p>
            <p className={styles.itemTable6}> </p>
          </div>
          {isAuth && (
            <div className={styles.notAuth}>
              Нет данных. Скорее всего вы не зарегистрировались или не вошли в
              аккаунт.
              <Link className={styles.link} to={"/login"}>
                Войти?
              </Link>
            </div>
          )}
          {stat.map((item, indx) => (
            <div className={styles.itemTable} key={indx}>
              <p className={styles.itemTable1}>{indx + 1}</p>
              <p className={styles.itemTable2}>{item.nameOfProg}</p>
              <p className={styles.itemTable3}>{item.correctCount}</p>
              <p className={styles.itemTable4}>{item.saveTime}</p>
              <p className={styles.itemTable5}> {item.date}</p>
              <p className={styles.itemTable6}>
                {" "}
                <img
                  onClick={() => clickOnDeleteButton(item.id, indx)}
                  className={styles.deleteIcon}
                  src={deleteIcon}
                  alt="deleteIcon"
                />
              </p>
            </div>
          ))}
        </div>

        <div
          className={
            popUpBundle ? styles.deletePopUpShow : styles.deletePopUpHide
          }
        >
          <div className={styles.InnerPopUp}>
            <h3>Вы точно хотите удалить запись?</h3>
            <div className={styles.ButtonsWrap}>
              {" "}
              <MyButton onClick={clickOnBtnOff}>Нет</MyButton>
              <MyButton onClick={clickOnBtn}>Да</MyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistic;
