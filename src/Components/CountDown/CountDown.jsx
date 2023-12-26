import { useState, useEffect } from "react";
import styles from "./CountDown.module.css";
const CountDown = ({ giveSaveTime }) => {
  const [seconds, setSeconds] = useState(0);

  giveSaveTime(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      <div className={styles.wrap}>
        <p>{formatTime(seconds)}</p>
      </div>
    </>
  );
};

export default CountDown;
