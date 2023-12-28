import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import styles from "./styles/Quize.module.css";
import QuizeFofm from "./QuizeFofm";
import QuizeResult from "./QuizeResult";
import MyButton from "../UI/MyButton/MyButton";

const Quize = () => {
  const [mainResult, setMainResult] = useState([]);
  const [arrForResult, setArrForResult] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswrNumber, setCorrectAnswrNumber] = useState(0);

  const local = useLocation();

  const numberProf = local.state.numberProf;
  const mode = local.state.stateRadioBtn;
  const checked = local.state.checked;
  const newMail = local.state.newMail;
  const nameOfProg = local.state.age;

  useEffect(() => {
    axios
      .get(`https://c443eaf7af5a8981.mokky.dev/allQuestions/${numberProf}`)
      .then((res) => {
        // eslint-disable-next-line no-unused-vars
        const arr = [res.data].map(({ id, ...rest }) => rest);
        const newArray = Object.values(...arr);

        //Режим Тренировка
        if (mode === "Тренировка") {
          if (checked) {
            setMainResult(newArray.sort(() => Math.random() - 0.5));
            setLoading(false);
          } else {
            setMainResult(newArray);
            setLoading(false);
          }
        } else {
          //Режим Экзамен
          const randomNumbers = [];
          for (let i = 0; i < 10; i++) {
            const randomNumber = Math.floor(Math.random() * newArray.length);
            randomNumbers.push(randomNumber);
          }
          const resultArr = [];
          for (let i = 0; i < randomNumbers.length; i++) {
            let num = randomNumbers[i];
            resultArr.push(newArray[num]);
          }
          setMainResult(resultArr);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setTimeout(() => {
          setError(true);
        }, 2000);
      });
  }, []);

  const correctAswrs = (arr) => {
    setArrForResult(arr);
  };
  return (
    <div>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div className={error ? styles.errorShow : styles.errorHide}>
            <h3>В стадии разработки...</h3>
            <p>
              Можете написать мне в{" "}
              <a
                className={styles.myLink}
                href="https://t.me/YakimtsevKonstantin"
              >
                телеграмм
              </a>
            </p>
            <Link to={"/main"}>
              <MyButton>Назад</MyButton>
            </Link>
          </div>

          {isLoading ? (
            <div>
              <div
                className={
                  showResult ? styles.InnerLoaderHide : styles.InnerLoader
                }
              >
                {" "}
                <span className={styles.loader}></span>
              </div>
            </div>
          ) : (
            <QuizeFofm
              correctAswrs={correctAswrs}
              newMail={newMail}
              mainResult={mainResult}
              setLoading={setLoading}
              nameOfProg={nameOfProg}
              setShowResult={setShowResult}
              setCorrectAnswrNumber={setCorrectAnswrNumber}
              mode={mode}
            ></QuizeFofm>
          )}
          {showResult && (
            <div className={styles.resultInner}>
              <QuizeResult
                arrForResult={arrForResult}
                correctAnswrNumber={correctAnswrNumber}
                newMail={newMail}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quize;
