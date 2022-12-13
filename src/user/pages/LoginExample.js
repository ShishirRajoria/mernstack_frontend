

import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';




const regPassword =
  /^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+\.+[a-z]+$/;

export default function SignIn() {

    const[emailIsValid,setEmailIsValid] = useState(false);
    const[passwordIsValid,setPasswordIsValid] = useState(false);

    const changeEmailHandler = (event) => {
        console.log(event.target.value);
        if(regEmail.test(event.target.value)){
          setEmailIsValid(true);
        }
        else{
            setEmailIsValid(false);
            console.log(emailIsValid)
        }
    }
    const changePasswordHandler = (event) => {
        console.log(event.target.value);
        if(regPassword.test(event.target.value)){
            setPasswordIsValid(true);
        }
        else{
            setPasswordIsValid(false);  
        }
    }
let formIsValid = emailIsValid && passwordIsValid;
console.log(formIsValid);

  const handleSubmit = (event) => {
    event.preventDefault();
   console.log(event.target.email.value);
  };

//   const commonHandler = () => {
// console.log('hello');
//   }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type='email'
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            onChange={changeEmailHandler}
           
              
            />



            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changePasswordHandler}
             
        
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formIsValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
   
  );
}