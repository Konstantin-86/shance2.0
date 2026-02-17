import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import styles from "./styles//App.module.css";

function App() {
  const [showTitle, setShowTitle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // Просто показываем заголовок, независимо от статуса авторизации
      setShowTitle(true);

      // Если хотите редиректить авторизованных пользователей на main,
      // но сейчас сайт закрыт, так что лучше не редиректить
      // if (user) {
      //   navigate("/main");
      // }
    });
  }, [navigate]);

  const handleRustoreClick = () => {
    window.open("https://www.rustore.ru/catalog/app/ru.ot.test", "_blank");
  };

  return (
    <>
      <div className={styles.innerApp}>
        <div className={styles.appContainer}>


          <div className={styles.closedMessage}>
            <h2>Сайт временно закрыт</h2>
            <p>Уважаемые пользователи!</p>
            <p>Наше приложение теперь доступно для скачивания в RuStore.</p>
            <p>Перейдите по ссылке ниже, чтобы установить приложение:</p>

            <button
              onClick={handleRustoreClick}
              className={styles.rustoreButton}
            >
              Скачать в RuStore
            </button>

            <p className={styles.smallNote}>
              Приложение: ru.ot.test
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;