import { useState, useEffect } from "react";
import styles from "./CountDown.module.css";
const CountDown = () => {
  const [time, setTime] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      if (time == 0) {
        return alert("Время вышло");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={styles.wrap}>
        {time}
        <p className={styles.circle}></p>
      </div>
    </>
  );
};

export default CountDown;
