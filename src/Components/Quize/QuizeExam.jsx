import { useRef } from "react";
import { useSwipeable } from "react-swipeable";

import MyButton from "../UI/MyButton/MyButton";
import MyBackButton from "../UI/MyBackButton/MyBackButton";
import styles from "./styles/QuizeExam.module.css";
import CountDown from "../CountDown/CountDown";

const QuizeExam = ({
  mainResult,
  countQuest,
  preSelection,
  preSelectionFunc,
  nextQuestionFunc,
  showEffect,
  giveSaveTime,
  showAlert,
  showCheats
}) => {
  const handlers = useSwipeable({
    onSwiped: ({ dir }) => {
      if (dir == "Left") nextQuestionFunc();
    },
  });
  const myRef = useRef();

  const refPassthrough = (el) => {
    handlers.ref(el);
    myRef.current = el;
  };
  console.log(+mainResult[countQuest].OTV1.slice(0, 1) === mainResult[countQuest].T5 && showCheats && ";");
  console.log("mainResult[countQuest].OTV1.slice(0, 1)", +mainResult[countQuest].OTV1.slice(0, 1));
  console.log("mainResult[countQuest].T5", mainResult[countQuest].T5);
  console.log("showCheats", showCheats);
  

  return (
    <div>
      <div className={styles.box}>
        <div {...handlers} ref={refPassthrough} className={styles.ezamWrap}>
          <MyBackButton />
          <div className={styles.numberOfQuestion}>
            {countQuest + 1} / {mainResult.length}
          </div>
          <div
            className={showAlert ? styles.noAnswerActive : styles.noAnswerHide}
          >
            Выберите ответ
          </div>
          <CountDown
            mainResult={mainResult}
            countQuest={countQuest}
            giveSaveTime={giveSaveTime}
          />
          <div className={styles.nameOfProg}>Экзамен</div>
          {showEffect && (
            <div>
              <div className={styles.Quest}>{mainResult[countQuest].NAMEB}</div>
              <div
                className={preSelection == 1 ? styles.itemActive : styles.item}
                onClick={() => preSelectionFunc(1)}
              >
                {mainResult[countQuest].OTV1}
                {+mainResult[countQuest].OTV1.slice(0, 1) === mainResult[countQuest].T5 && showCheats && ";"}
              </div>
              <div
                className={preSelection == 2 ? styles.itemActive : styles.item}
                onClick={() => preSelectionFunc(2)}
              >
                {mainResult[countQuest].OTV2}
                {+mainResult[countQuest].OTV2.slice(0, 1) === mainResult[countQuest].T5 && showCheats && ";"}
              </div>
              {mainResult[countQuest].OTV3 && (
                <div
                  className={
                    preSelection == 3 ? styles.itemActive : styles.item
                  }
                  onClick={() => preSelectionFunc(3)}
                >
                  {mainResult[countQuest].OTV3}
                  {+mainResult[countQuest].OTV3.slice(0, 1) === mainResult[countQuest].T5 && showCheats && ";"}
                </div>
              )}
              {mainResult[countQuest].OTV4 && (
                <div
                  className={
                    preSelection == 4 ? styles.itemActive : styles.item
                  }
                  onClick={() => preSelectionFunc(4)}
                >
                  {mainResult[countQuest].OTV4}
                  {+mainResult[countQuest].OTV4.slice(0, 1) === mainResult[countQuest].T5 && showCheats && ";"}
                </div>
              )}
              {mainResult[countQuest].OTV5 && (
                <div
                  className={
                    preSelection == 5 ? styles.itemActive : styles.item
                  }
                  onClick={() => preSelectionFunc(5)}
                >
                  {mainResult[countQuest].OTV5}
                  {+mainResult[countQuest].OTV5.slice(0, 1) === mainResult[countQuest].T5 && showCheats && ";"}
                </div>
              )}
            </div>
          )}

          <div className={styles.btnWrap}>
            
            <MyButton onClick={nextQuestionFunc}>Следующий вопрос</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizeExam;
