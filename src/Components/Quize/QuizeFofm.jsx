import { useEffect, useState } from "react";
import axios from "axios";

import QuizeTrain from "./QuizeTrain";
import QuizeExam from "./QuizeExam";

const QuizeFofm = ({
  mainResult,
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
  const nextQuestionFunc = async () => {
    if (preSelection == null) return alert("выберите ответ");
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
      setCorrectAnswrNumber(correctCount);
      setLoading(true);
      setShowResult(true);
      let newArr = [...currentAnswersArr, mainResult[countQuest]];
      newArr[countQuest].personResponse = preSelection;
      await axios
        .post("https://c443eaf7af5a8981.mokky.dev/results", {
          name: newMail,
          date: currentDate,
          correctCount,
          nameOfProg,
        })
        .catch((e) => console.log(e))
        .finally(() => {
          correctAswrs(newArr);
        });
    } else {
      setCountQuest(countQuest + 1);
    }
  };
  return (
    <>
      {mode == "Тренировка" ? (
        <QuizeTrain mainResult={mainResult} />
      ) : (
        <QuizeExam
          mainResult={mainResult}
          countQuest={countQuest}
          preSelection={preSelection}
          preSelectionFunc={preSelectionFunc}
          nextQuestionFunc={nextQuestionFunc}
        />
      )}
    </>
  );
};

export default QuizeFofm;
