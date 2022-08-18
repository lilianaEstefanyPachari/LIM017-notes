import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import logo from "../../../assets/logo.png";
import styles from "./loginUser.module.css";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
//firebase
import { signInUser } from "../../../services/auth";

const LoginUser = () => {
  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //navigate para ruteo
  const navigate = useNavigate();
  //handler login
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signInUser(data.email, data.password);
      navigate("/homepage");
    } catch (error) {
      console.log(error.code, error.message);
    }
  };
  //handler back to register
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="xs" style={{ background: "#ff6f0045" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "35%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} className={styles.logo}></img>
        </Box>
        <Box
          sx={{
            height: "60%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            borderRadius: "15px",
          }}
        >
          <h2 className={styles.title}>Sign in</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                {...register("email", {
                  required: "Required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...register("password", {
                  required: "Required field",
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background:
                  "linear-gradient(88.47deg, rgba(133, 231, 242, 0.93) 0.74%, #E1A7F3 29.67%, #F2B6DC 55.92%, #F2C36B 85.56%, #F2C84B 103.59%)",
                color: "#FFFFFF",
                fontWeight: "800",
              }}
            >
              Sign in
            </Button>
          </form>
          <Button
            onClick={handleRegister}
            sx={{
              color: "gray",
              fontWeight: "500",
            }}
          >
            Dont have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginUser;
