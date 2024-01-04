import { useEffect, useRef, useState } from "react";

import MyButton from "../MyButton/MyButton";
import Switch from "../Switch/Switch";

import AllProf from "../../../DATA/AllProf.json";
import { useNavigate } from "react-router-dom";

import styles from "./MySelect.module.css";

import arrow from "../../../assets/images/icons/arrow.png";
import ok from "../../../assets/images/icons/OKgreen.png";

export default function MySelect({ newMail }) {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberProf, setNumberProf] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [stateRadioBtn, setStateRadioBtn] = useState("");
  const [checked, setChecked] = useState(true);

  const [selectToogle, setselectToogle] = useState(false);
  const [selectProgItem, setSelectProgItem] = useState("Выберите профессию");
  const refSelect = useRef();

  const goQuizze = () => {
    if (stateRadioBtn == "") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    navigate("/main/quize", {
      state: { numberProf, stateRadioBtn, checked, newMail, age },
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (refSelect.current && !refSelect.current.contains(event.target)) {
        setselectToogle(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [refSelect]);
  const selectToogleFunc = () => {
    setselectToogle(!selectToogle);
    setSelectProgItem("Выберите профессию");
  };

  const chooiceProg = (index) => {
    setSelectProgItem(AllProf[index].NAMEP);
    setselectToogle(false);
    setNumberOfQuestions(AllProf[index].KVOP);
    setNumberProf(AllProf[index].KODP);
    setAge(AllProf[index].NAMEP);
    setShowButton(true);
  };
  const [chooseModeNum, setChooseModeNum] = useState(0);
  const chooseMode = (number) => {
    setChooseModeNum(number);
    if (number == 1) {
      setStateRadioBtn("Тренировка");
    } else {
      setStateRadioBtn("Экзамен");
    }
  };
  return (
    <>
      <div ref={refSelect} className={styles.customSelectInner}>
        <div
          onClick={selectToogleFunc}
          className={
            selectToogle
              ? styles.customSelectTextActive
              : styles.customSelectText
          }
        >
          {" "}
          <p
            className={
              selectToogle
                ? styles.customSelectTitleActive
                : styles.customSelectTitle
            }
          >
            {selectProgItem}
          </p>
          <img
            className={
              selectToogle
                ? styles.customSelectArrowActive
                : styles.customSelectArrow
            }
            src={arrow}
            alt="arrow"
          />
        </div>
        <div
          className={showAlert ? styles.noAnswerActive : styles.noAnswerHide}
        >
          Выберите режим
        </div>

        <ul
          className={
            selectToogle
              ? styles.customSelectListActive
              : styles.customSelectList
          }
        >
          {AllProf.map((item, index) => (
            <li
              className={styles.customSelectItem}
              onClick={() => chooiceProg(index)}
              key={item.NAMEP}
            >
              {item.NAMEP}
            </li>
          ))}
        </ul>
      </div>

      {showButton && (
        <div className={styles.showButtonContainer}>
          <h3 className={styles.mainTitle}>Правила по охране труда {age}</h3>
          <div className={styles.countQuestions}>
            Количество вопросов: {numberOfQuestions}
          </div>
          <div className={styles.countQuestions}>
            Номер программы: {numberProf}
          </div>
          <div className={styles.innerRadioBtns}>
            <span>Выберите режим:</span>
            <div className={styles.wrapMode}>
              {" "}
              <div onClick={() => chooseMode(1)} className={styles.radioBtn}>
                {chooseModeNum == 1 && (
                  <img className={styles.imgOk} src={ok} alt="ok" />
                )}
                Тренировка
              </div>
              <div onClick={() => chooseMode(2)} className={styles.radioBtn}>
                {chooseModeNum == 2 && (
                  <img className={styles.imgOk} src={ok} alt="ok" />
                )}
                Экзамен
              </div>
            </div>
          </div>

          <div
            className={
              stateRadioBtn == "Тренировка"
                ? styles.swicherInnerShow
                : styles.swicherInnerHide
            }
          >
            <Switch checked={checked} setChecked={setChecked}>
              Перемешать вопросы?
            </Switch>
          </div>
          <div className={styles.buttonWrap}>
            <MyButton onClick={goQuizze}>запустить</MyButton>
          </div>
        </div>
      )}
    </>
  );
}
