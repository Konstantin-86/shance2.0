import MyButton from "../UI/MyButton";
import styles from "../../styles/QuizeExam.module.css";

const QuizeExam = ({
  mainResult,
  countQuest,
  preSelection,
  preSelectionFunc,
  nextQuestionFunc,
}) => {
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.trainWrap}>
          <div className={styles.numberOfQuestion}>
            {countQuest + 1} / <br /> {mainResult.length}
          </div>
          <div className={styles.nameOfProg}>Экзамен</div>
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
              className={preSelection == 3 ? styles.itemActive : styles.item}
              onClick={() => preSelectionFunc(3)}
            >
              {mainResult[countQuest].OTV3}
            </div>
          )}
          {mainResult[countQuest].OTV4 && (
            <div
              className={preSelection == 4 ? styles.itemActive : styles.item}
              onClick={() => preSelectionFunc(4)}
            >
              {mainResult[countQuest].OTV4}
            </div>
          )}
          {mainResult[countQuest].OTV5 && (
            <div
              className={preSelection == 5 ? styles.itemActive : styles.item}
              onClick={() => preSelectionFunc(5)}
            >
              {mainResult[countQuest].OTV5}
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
