import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./Signup.module.css";

const defaultTheme = createTheme();

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleError, setHandleError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setHandleError(true);
        setTimeout(() => {
          setHandleError(false);
        }, 2000);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.textTitle}> Регистрация </p>
        <div
          className={handleError ? styles.errorTextShow : styles.errorTextHide}
        >
          Ошибка логина или пароля
        </div>

        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: green[500] }}></Avatar>
              <Typography component="h1" variant="h5">
                Регистрация
              </Typography>
              <Box
                component="form"
                onSubmit={onSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Почта email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete={"setEmail"}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Зарегистрироваться
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        <p className={styles.text}>
          Есть аккаунт? <NavLink to="/login">Войти</NavLink>
        </p>
      </div>
    </>
  );
};

export default Signup;
