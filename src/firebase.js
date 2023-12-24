import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA0GPcfgxMYKFxH-SQ6_vHvMcSeHOrm81k",
  authDomain: "shanse-auth.firebaseapp.com",
  projectId: "shanse-auth",
  storageBucket: "shanse-auth.appspot.com",
  messagingSenderId: "541987192079",
  appId: "1:541987192079:web:524fa9407474b7181e927a",
  measurementId: "G-Z79KMFZZKF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
