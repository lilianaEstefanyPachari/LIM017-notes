import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { useAuth } from '../../context/authContext';

// import { useContext } from 'react';
// import { context } from '../../context/authContext';

import { useNavigate } from "react-router-dom";

export default function Welcome() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  // const authContext = useContext(context);
  // console.log(authContext)
  // const {user}= useAuth();
  // console.log(user)

  return (
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
            Cotton Notes
          </Typography>
          <Box >
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Start
            </Button>
          </Box>
        </Box>
      </Container>
  );
}