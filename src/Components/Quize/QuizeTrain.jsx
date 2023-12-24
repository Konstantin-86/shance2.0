import { useState, useRef } from "react";

import { useSwipeable } from "react-swipeable";

import styles from "../../styles/QuizeTrain.module.css";
import MyButton from "../UI/MyButton";
import MyBackButton from "../UI/MyBackButton/MyBackButton";

const QuizeTrain = ({ mainResult }) => {
  const [showCorrectNumber, setShowCorrectNumber] = useState(null);
  const [countQuest, setCountQuest] = useState(0);
  const [endOfQuestions, setEndOfQuestions] = useState(true);
  const [search, setSearch] = useState("");
  const [filtredSearch, setFiltredSearch] = useState([]);
  const [showFiltredSearch, setShowFiltredSearch] = useState(false);
  const [goSearchItem, setGoSearchItem] = useState(false);
  const [goSearchArr, setGoSearchArr] = useState([]);

  const showCorrectAnswer = (number) => {
    setShowCorrectNumber(number);
  };
  const nextQuestionFunc = () => {
    setGoSearchItem(false);
    setCountQuest(countQuest + 1);
    setShowCorrectNumber(null);
    // закончились вопросы
    if (mainResult.length - 1 == countQuest) {
      setEndOfQuestions(false);
    }
  };
  const prevQuestionFunc = () => {
    if (countQuest == 0) return setCountQuest(0);
    setGoSearchItem(false);
    setCountQuest(countQuest - 1);
    setShowCorrectNumber(null);
    // закончились вопросы
    if (mainResult.length - 1 == countQuest) {
      setEndOfQuestions(false);
    }
  };
  function searchFunc(e) {
    setSearch(e.target.value);

    const arr = mainResult.filter((item) =>
      item.NAMEB.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltredSearch(arr);
    if (arr.length == 0) {
      return setShowFiltredSearch(false);
    }
    if (arr.length !== mainResult.length) {
      setShowFiltredSearch(true);
    } else {
      setShowFiltredSearch(false);
    }
  }
  const goSearchItemFunc = (item) => {
    setShowFiltredSearch(false);
    setSearch("");
    setGoSearchItem(true);
    setGoSearchArr(item);
  };
  const handlers = useSwipeable({
    onSwiped: ({ dir }) => {
      if (dir == "Left") nextQuestionFunc();
      if (dir == "Right") prevQuestionFunc();
    },
  });

  // setup ref for your usage
  const myRef = useRef();

  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    myRef.current = el;
  };
  /* const showCorrectAnswer = () => {}; */
  return (
    <div>
      <div {...handlers} ref={refPassthrough} className={styles.mainContainer}>
        {endOfQuestions ? (
          <div className={styles.trainWrap}>
            <div className={styles.numberOfQuestion}>
              {countQuest + 1} / <br /> {mainResult.length}
            </div>
            <div className={styles.search}>
              <input
                className={styles.inpt}
                type="text"
                value={search}
                onChange={searchFunc}
                placeholder="Поиск по всем вопросам..."
              />
              <div
                className={
                  showFiltredSearch
                    ? styles.filtredSearchShow
                    : styles.filtredSearchHide
                }
              >
                {filtredSearch.map((item, index) => (
                  <div key={index}>
                    <p
                      onClick={() => goSearchItemFunc(item)}
                      className={styles.item}
                    >
                      {item.NAMEB}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.nameOfProg}>Тренировка</div>
            <div
              onClick={showCorrectAnswer}
              className={styles.showCorrectAnswer}
            >
              Показывать правильный ответ
            </div>
            <MyBackButton />
            {goSearchItem ? (
              <div className={styles.itemBox}>
                <div className={styles.Quest}>{goSearchArr.NAMEB}</div>
                <div
                  className={styles.answerItem}
                  onClick={() => showCorrectAnswer(1)}
                >
                  {goSearchArr.OTV1}
                </div>
                <div
                  className={styles.answerItem}
                  onClick={() => showCorrectAnswer(2)}
                >
                  {goSearchArr.OTV2}
                </div>
                {goSearchArr.OTV3 && (
                  <div
                    className={styles.answerItem}
                    onClick={() => showCorrectAnswer(3)}
                  >
                    {goSearchArr.OTV3}
                  </div>
                )}
                {goSearchArr.OTV4 && (
                  <div
                    className={styles.answerItem}
                    onClick={() => showCorrectAnswer(4)}
                  >
                    {goSearchArr.OTV4}
                  </div>
                )}
                {goSearchArr.OTV5 && (
                  <div
                    className={styles.answerItem}
                    onClick={() => showCorrectAnswer(5)}
                  >
                    {goSearchArr.OTV5}
                  </div>
                )}
                {showCorrectNumber && (
                  <div className={styles.correctAnswer}>
                    Правильный ответ № {goSearchArr.T5}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.itemBox}>
                <div className={styles.Quest}>
                  {mainResult[countQuest].NAMEB}
                </div>
                <div
                  className={styles.answerItem}
                  onClick={() => showCorrectAnswer(1)}
                >
                  {mainResult[countQuest].OTV1}
                </div>
                <div
                  className={styles.answerItem}
                  onClick={() => showCorrectAnswer(2)}
                >
                  {mainResult[countQuest].OTV2}
                </div>
                {mainResult[countQuest].OTV3 && (
                  <div
                    className={styles.answerItem}
                    onClick={() => showCorrectAnswer(3)}
                  >
                    {mainResult[countQuest].OTV3}
                  </div>
                )}
                {mainResult[countQuest].OTV4 && (
                  <div
                    className={styles.answerItem}
                    onClick={() => showCorrectAnswer(4)}
                  >
                    {mainResult[countQuest].OTV4}
                  </div>
                )}
                {mainResult[countQuest].OTV5 && (
                  <div
                    className={styles.answerItem}
                    onClick={() => showCorrectAnswer(5)}
                  >
                    {mainResult[countQuest].OTV5}
                  </div>
                )}
                {showCorrectNumber && (
                  <div className={styles.correctAnswer}>
                    Правильный ответ № {mainResult[countQuest].T5}
                  </div>
                )}
              </div>
            )}

            <div className={styles.btnWrap}>
              {" "}
              <MyButton onClick={nextQuestionFunc}>Следующий вопрос</MyButton>
            </div>
          </div>
        ) : (
          <div className={styles.end}>Вопросы закончились...</div>
        )}
      </div>
    </div>
  );
};

export default QuizeTrain;
