import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/QuizeResult.module.css";

import MyBackButton from "../UI/MyBackButton/MyBackButton";
import MyButton from "../UI/MyButton";

import notbad from "../../assets/images/smailIcons/notBad.png";
import bad from "../../assets/images/smailIcons/bad.png";
import good from "../../assets/images/smailIcons/good.png";
import okgreen from "../../assets/images/icons/OKgreen.png";
import nored from "../../assets/images/icons/NOred.png";

const QuizeResult = ({ newMail, arrForResult, correctAnswrNumber }) => {
  const [notbadState, setNotbadState] = useState(notbad);
  const [showAnswers, setShowAnswers] = useState(false);
  const nav = useNavigate();
  const goToStat = () => {
    nav("../main/userstat", {
      state: { newMail },
    });
  };
  useEffect(() => {
    if (correctAnswrNumber >= 7) {
      setNotbadState(good);
    }
    if (correctAnswrNumber >= 5) {
      setNotbadState(notbad);
    } else {
      setNotbadState(bad);
    }
  }, []);
  const showCoorectFunc = () => {
    setShowAnswers(!showAnswers);
  };
  const itemList = arrForResult.map((elem, index) => (
    <div key={index} className={styles.item}>
      <div className={styles.itemBox}>
        <h3 className={styles.itemTitle}>{elem.NAMEB}</h3>
        <p
          className={
            elem.OTV1.slice(0, 1) == elem.T5
              ? styles.itemTextCoorect
              : styles.itemText
          }
        >
          {elem.OTV1}
        </p>
        <p
          className={
            elem.OTV2.slice(0, 1) == elem.T5
              ? styles.itemTextCoorect
              : styles.itemText
          }
        >
          {elem.OTV2}
        </p>
        {elem.OTV3 && (
          <p
            className={
              elem.OTV3.slice(0, 1) == elem.T5
                ? styles.itemTextCoorect
                : styles.itemText
            }
          >
            {elem.OTV3}
          </p>
        )}
        {elem.OTV4 && (
          <p
            className={
              elem.OTV4.slice(0, 1) == elem.T5
                ? styles.itemTextCoorect
                : styles.itemText
            }
          >
            {elem.OTV4}
          </p>
        )}
        {elem.OTV5 && (
          <p
            className={
              elem.OTV5.slice(0, 1) == elem.T5
                ? styles.itemTextCoorect
                : styles.itemText
            }
          >
            {elem.OTV5}
          </p>
        )}
      </div>
      <div className={styles.itemBox}>
        {elem.personResponse === elem.T5 && (
          <img className={styles.statusImg} src={okgreen} alt="okgreen" />
        )}
        {elem.personResponse !== elem.T5 && (
          <img className={styles.statusImg} src={nored} alt="okgreen" />
        )}
      </div>
    </div>
  ));

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <MyBackButton />
          {/* <Link to={"/main/quize"}>
            <div className={styles.refreshButton}>Заново</div>
          </Link> */}

          <h2 className={styles.title}>Результаты</h2>
          <div className={styles.countQuest}>
            Правильных ответов {correctAnswrNumber} из 10
          </div>

          <div className={styles.imgWrapper}>
            <img className={styles.imageIcon} src={notbadState} alt="notbad" />
          </div>
          <div className={styles.buttonsInner}>
            <MyButton onClick={showCoorectFunc} variant="contained">
              Правильные ответы
            </MyButton>
            <MyButton variant="contained" onClick={goToStat}>
              Статистика
            </MyButton>
          </div>
          <div
            className={
              showAnswers
                ? styles.innerCoorectAnswersShow
                : styles.innerCoorectAnswersHide
            }
          >
            {itemList}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizeResult;
