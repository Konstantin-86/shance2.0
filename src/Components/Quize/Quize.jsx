import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import styles from "./styles/Quize.module.css";
import QuizeFofm from "./QuizeFofm";
import QuizeResult from "./QuizeResult";
import MyBackButton from "../UI/MyBackButton/MyBackButton";

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

  let numbers = [];
  while (numbers.length < 10) {
    let randomNumber = Math.floor(Math.random() * 201);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  useEffect(() => {
    axios
      .get(`https://c443eaf7af5a8981.mokky.dev/allQuestions/${numberProf}`)
      .then((res) => {
        // eslint-disable-next-line no-unused-vars
        const arr = [res.data].map(({ id, ...rest }) => rest);
        const newArr = Object.values(...arr);
        //Режим Тренировка
        if (mode === "Тренировка") {
          if (checked) {
            setMainResult(newArr.sort(() => Math.random() - 0.5));
            console.log(mainResult);
            setLoading(false);
          } else {
            setMainResult(newArr);
            setLoading(false);
          }
        } else {
          //Режим Экзамен

          const resultArr = [];
          numbers.map((item) => {
            resultArr.push(newArr[item]);
          });
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
  const goAgain = () => {
    setLoading(false);
    setShowResult(false);
  };
  return (
    <div>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div className={error ? styles.errorShow : styles.errorHide}>
            <div className={styles.errorDev}>
              <h3 className={styles.errorDevTitle}>В стадии разработки...</h3>
              <p className={styles.errorDevText}>
                Можете написать мне в{" "}
                <a
                  className={styles.myLink}
                  href="https://t.me/YakimtsevKonstantin"
                >
                  телеграмм
                </a>
              </p>
              <MyBackButton />
            </div>
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
              setMainResult={setMainResult}
            ></QuizeFofm>
          )}
          {showResult && (
            <div className={styles.resultInner}>
              <QuizeResult
                goAgain={goAgain}
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
