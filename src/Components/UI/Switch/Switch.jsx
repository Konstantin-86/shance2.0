import { useState } from "react";
import styles from "./Switch.module.css";

const Switch = ({ children, setChecked, checked }) => {
  const [switchToogle, setSwitchToogle] = useState(true);

  const switchBundle = (e) => {
    e.preventDefault();
    setSwitchToogle(!switchToogle);
  };

  return (
    <div>
      <div className={styles.inner}>
        <p>{children}</p>
        <form
          onClick={switchBundle}
          className={
            switchToogle ? styles.innerRadioBtnActive : styles.innerRadioBtn
          }
        >
          <label htmlFor="switch">
            {" "}
            <input
              checked={checked}
              onChange={() => setChecked(!checked)}
              type="checkbox"
              id="switch"
            />
            <span></span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Switch;
