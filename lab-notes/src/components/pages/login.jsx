/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useState } from 'react';

import { useAuth } from '../../context/authContext';

import { useNavigate } from "react-router-dom";

//servicio de Auth de firebase
// import { createUser, sendEmail } from '../../services/auth'; 

const theme = createTheme();

export default function SignIn() {

  const [user, setUser] = useState({
    email:'',
    password:''
  });

  const [errorMsg, setError] = useState();

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data,e) => {
    console.log(data);
    setUser(data);
    setError('');
    try{
      await signIn(data.email, data.password);
      navigate('/home')
      // e.target.reset()
    } 
    catch(error){
      console.log(error.code);
      if(error.code === 'auth/weak-password'){
        setError('La contraseña debe ser mayor a 6 carácteres')
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email", { 
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }
                  })}
                  error={!!errors?.email}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  {...register("password", { required: true })}
                  error={!!errors?.password}
                />
                {errorMsg && <span>{errorMsg}</span>  }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}