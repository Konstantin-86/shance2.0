import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

/* import axios from "axios"; */

import UserMenu from "../Components/User/Menu/UserMenu.jsx";
import MySelect from "./UI/MySelect/MySelect.jsx";

import styles from "../styles//SecondPage.module.css";

/* import prog14 from "../DATA/PROGV014.json";
import all from "../DATA/AllQuestions.json"; */

import logo from "../assets/images/logo2.png";
import UserNotAuth from "../Components/User/NotAuth/UserNotAuth.jsx";

const SecondPage = () => {
  const [newMail, setNewMail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        setNewMail(email);
      }
    });
  }, []);
  // для добавления новых вопросов
  /* const show = async () => {
    const arr = prog14.map((elem) => elem.NOMB);

    let arr2 = [];
    for (let i = 0; i < all.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (all[i].NOMB == arr[j]) {
          arr2.push(all[i]);
        }
      }
    }
    const arr3 = arr2.map(
      // eslint-disable-next-line no-unused-vars
      ({ NOMB, KODL, PRIZN, PUNKT, ...rest }) => rest
    );
    console.log(arr3); 
    await axios
      .post("https://c443eaf7af5a8981.mokky.dev/allQuestions", arr3)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }; */
  return (
    <div>
      <div className={styles.wrapPage}>
        <div className={styles.container}>
          {/* <button onClick={show}>show</button> */}

          <div className={styles.InnerPage}>
            <img className={styles.logo} src={logo} alt="logo" />
            {newMail ? (
              <div>
                <UserMenu newMail={newMail} setNewMail={setNewMail} />
              </div>
            ) : (
              <div>
                <UserNotAuth></UserNotAuth>
              </div>
            )}
          </div>

          <h3 className={styles.title}>
            Программа для проверки знаний по охране труда
          </h3>
          <MySelect newMail={newMail} />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
