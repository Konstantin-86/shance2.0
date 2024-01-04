import { useEffect, useState } from "react";
import axios from "axios";

import QuizeTrain from "./QuizeTrain";
import QuizeExam from "./QuizeExam";

const QuizeFofm = ({
  mainResult,
  setMainResult,
  setLoading,
  newMail,
  correctAswrs,
  nameOfProg,
  setShowResult,
  setCorrectAnswrNumber,
  mode,
}) => {
  const [countQuest, setCountQuest] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentAnswersArr, setCurrentAnswersArr] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [preSelection, setPreSelection] = useState(null);
  const [saveTime, setSaveTime] = useState(null);
  const [showEffect, setShowEffect] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes =
      (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes();
    setCurrentDate(`${day} ${month} ${year} ${hours}-${minutes}`);
  }, []);
  const preSelectionFunc = (number) => {
    setPreSelection(number);
  };
  const giveSaveTime = (time) => {
    setSaveTime(time);
  };

  const nextQuestionFunc = async () => {
    if (preSelection == null) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    setShowEffect(false);
    //массив вопрос + ответ
    let newArr = [...currentAnswersArr, mainResult[countQuest]];
    newArr[countQuest].personResponse = preSelection;
    setPreSelection(null);
    setCurrentAnswersArr(newArr);

    //счетчик правильных ответов
    if (mainResult[countQuest].T5 == preSelection) {
      setCorrectCount(correctCount + 1);
    }
    // закончились вопросы
    if (mainResult.length - 1 == countQuest) {
      if (mainResult[countQuest].T5 == preSelection) {
        setCorrectAnswrNumber(correctCount + 1);
      } else {
        setCorrectAnswrNumber(correctCount);
      }

      setLoading(true);
      setShowResult(true);
      let newArr = [...currentAnswersArr, mainResult[countQuest]];
      newArr[countQuest].personResponse = preSelection;
      if (!newMail == "") {
        let rightNumber = correctCount;
        if (mainResult[countQuest].T5 == preSelection) {
          rightNumber = correctCount + 1;
        }
        await axios
          .post("https://c443eaf7af5a8981.mokky.dev/results", {
            name: newMail,
            date: currentDate,
            correctCount: rightNumber,
            nameOfProg,
            saveTime,
          })
          .catch((e) => console.log(e));
      }
    } else {
      setTimeout(() => {
        setShowEffect(true);
      }, 300);
      setCountQuest(countQuest + 1);
    }
    correctAswrs(newArr);
  };
  return (
    <>
      {mode == "Тренировка" ? (
        <QuizeTrain mainResult={mainResult} />
      ) : (
        <QuizeExam
          giveSaveTime={giveSaveTime}
          mainResult={mainResult}
          setMainResult={setMainResult}
          countQuest={countQuest}
          preSelection={preSelection}
          preSelectionFunc={preSelectionFunc}
          nextQuestionFunc={nextQuestionFunc}
          showEffect={showEffect}
          showAlert={showAlert}
        />
      )}
    </>
  );
};

export default QuizeFofm;
