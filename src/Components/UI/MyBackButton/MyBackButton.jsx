import { Link } from "react-router-dom";
import styles from "./MyBackButton.module.css";
const MyBackButton = ({ ...props }) => {
  return (
    <Link to={"/main"} {...props} className={styles.backbtn}>
      Назад
    </Link>
  );
};

export default MyBackButton;
