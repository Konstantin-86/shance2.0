import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { red, green } from "@mui/material/colors";

import styles from "../styles/UserStatistic.module.css";

import deleteIcon from "../assets/images/icons/delete.png";
import { Button } from "@mui/material";
import MyBackButton from "./UI/MyBackButton/MyBackButton";

const UserStatistic = () => {
  const local = useLocation();
  const newMail = local.state.newMail;
  const [stat, setStat] = useState([]);
  const [popUpBundle, setPopUpBundle] = useState(false);
  const [currentIndexToDelete, setCurrentIndexToDelete] = useState(0);

  useEffect(() => {
    axios
      .get(`https://c443eaf7af5a8981.mokky.dev/results?name=${newMail}`)
      .then((res) => {
        setStat(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  const clickOnBtn = () => {
    axios
      .delete(
        `https://c443eaf7af5a8981.mokky.dev/results/${currentIndexToDelete + 1}`
      )
      .then((res) => console.log("Удалено", res))
      .catch((e) => console.log(e))
      .finally(() => {
        const arr = stat.filter((elem) => elem.id !== currentIndexToDelete + 1);
        setStat(arr);
        setPopUpBundle(false);
      });
  };
  const clickOnBtnOff = () => {
    setPopUpBundle(false);
  };
  const clickOnDeleteButton = (indx) => {
    setCurrentIndexToDelete(indx);
    setPopUpBundle(true);
  };
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
            <p className={styles.itemTable4}>Дата прохождения</p>
          </div>
          {stat.map((item, indx) => (
            <div className={styles.itemTable} key={indx}>
              <p className={styles.itemTable1}>{indx + 1}</p>
              <p className={styles.itemTable2}>{item.nameOfProg}</p>
              <p className={styles.itemTable3}>{item.correctCount}</p>
              <p className={styles.itemTable4}>
                {" "}
                {item.date}
                <img
                  onClick={() => clickOnDeleteButton(indx)}
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
              <Button
                onClick={clickOnBtnOff}
                sx={{ bgcolor: green[500] }}
                variant="contained"
              >
                Нет
              </Button>
              <Button
                onClick={clickOnBtn}
                sx={{ bgcolor: red[500] }}
                variant="contained"
              >
                Да
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistic;
