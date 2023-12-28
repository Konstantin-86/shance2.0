import { useRef } from "react";
import { useSwipeable } from "react-swipeable";

import MyButton from "../UI/MyButton/MyButton";
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

  return (
    <div>
      <div className={styles.box}>
        <div {...handlers} ref={refPassthrough} className={styles.trainWrap}>
          <div className={styles.numberOfQuestion}>
            {countQuest + 1} / <br /> {mainResult.length}
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
              </div>
              <div
                className={preSelection == 2 ? styles.itemActive : styles.item}
                onClick={() => preSelectionFunc(2)}
              >
                {mainResult[countQuest].OTV2}
              </div>
              {mainResult[countQuest].OTV3 && (
                <div
                  className={
                    preSelection == 3 ? styles.itemActive : styles.item
                  }
                  onClick={() => preSelectionFunc(3)}
                >
                  {mainResult[countQuest].OTV3}
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
                </div>
              )}
            </div>
          )}

          <div className={styles.btnWrap}>
            {" "}
            <MyButton onClick={nextQuestionFunc}>Следующий вопрос</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizeExam;
