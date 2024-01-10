import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles/QuizeResult.module.css";

import MyBackButton from "../UI/MyBackButton/MyBackButton";
import MyButton from "../UI/MyButton/MyButton";

import notbad from "../../assets/images/smailIcons/notBad.png";
import bad from "../../assets/images/smailIcons/bad.png";
import good from "../../assets/images/smailIcons/good.png";
import okgreen from "../../assets/images/icons/OKgreen.png";
import nored from "../../assets/images/icons/NOred.png";

const QuizeResult = ({
  newMail,
  arrForResult,
  correctAnswrNumber,
  goAgain,
}) => {
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
      return setNotbadState(good);
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

  let arr2 = arrForResult.map((item) => {
    const { NAMEB, T5, personResponse, ...rest } = item;
    const valuesArray = Object.values(rest);
    return {
      name: NAMEB,
      answers: valuesArray,
      correctAnswer: T5,
      currentAnswer: personResponse,
    };
  });

  /*  const itemList = arrForResult.map((elem, index) => (
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
  )); */

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <MyBackButton />
          <button className={styles.goAgainBtn} onClick={goAgain}>
            Заново
          </button>

          <h2 className={styles.title}>Результаты</h2>
          <div className={styles.countQuest}>
            Правильных ответов {correctAnswrNumber} из 10
          </div>

          <div className={styles.imgWrapper}>
            <img className={styles.imageIcon} src={notbadState} alt="notbad" />
          </div>

          <div className={styles.buttonsInner}>
            <MyButton onClick={showCoorectFunc}>Правильные ответы</MyButton>
          </div>
          <div
            className={
              showAnswers
                ? styles.innerCoorectAnswersShow
                : styles.innerCoorectAnswersHide
            }
          >
            {arr2.map((item) => (
              <div key={item.name} className={styles.item}>
                <div className={styles.itemBox}>
                  <div>
                    <h3 className={styles.itemTitle}>{item.name}</h3>
                    {item.answers.map((elem, i) => (
                      <div key={i}>
                        <p
                          className={
                            i === item.correctAnswer - 1
                              ? i === item.currentAnswer - 1
                                ? styles.blue // правильный и полученный ответ совпадают
                                : styles.green // только правильный ответ
                              : i === item.currentAnswer - 1
                              ? styles.red // только полученный ответ
                              : styles.empty
                          }
                        >
                          {elem}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.itemBox}>
                  {item.currentAnswer === item.correctAnswer && (
                    <img
                      className={styles.statusImg}
                      src={okgreen}
                      alt="okgreen"
                    />
                  )}
                  {item.currentAnswer !== item.correctAnswer && (
                    <img
                      className={styles.statusImg}
                      src={nored}
                      alt="okgreen"
                    />
                  )}
                </div>
              </div>
            ))}
            <div className={styles.innerFooterBtns}>
              <button
                className={styles.footerBackBtn}
                onClick={() => window.history.back()}
              >
                Назад
              </button>
              <button className={styles.footerStatBtn} onClick={goToStat}>
                Статистика
              </button>
              <button className={styles.footerGoAgainBtn} onClick={goAgain}>
                Заново
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizeResult;
