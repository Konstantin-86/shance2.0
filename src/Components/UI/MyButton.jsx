import styles from "../../styles/MyButton.module.css";

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.myButton}>
      {children}
    </button>
  );
};

export default MyButton;
