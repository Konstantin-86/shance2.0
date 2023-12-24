import { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";

import styles from "../../styles//MyRadioButton.module.css";

export default function MyRadioButton({
  setStateRadioBtn,
  stateRadioBtn,
  checked,
  setChecked,
}) {
  const [showRadioButton, setShowRadioButton] = useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    if (stateRadioBtn == "Тренировка") {
      setShowRadioButton(true);
    } else {
      setShowRadioButton(false);
    }
  }, [stateRadioBtn]);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Выберите режим</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(e) => setStateRadioBtn(e.target.value)}
      >
        <FormControlLabel
          value="Тренировка"
          control={<Radio />}
          label="Тренировка"
        ></FormControlLabel>
        <FormControlLabel value="Экзамен" control={<Radio />} label="Экзамен" />
      </RadioGroup>
      <div
        className={
          showRadioButton ? styles.showRadioButton : styles.hideRadioButton
        }
      >
        Перемешать вопросы{" "}
        <Switch {...label} checked={checked} onChange={handleCheckboxChange} />
      </div>
    </FormControl>
  );
}
