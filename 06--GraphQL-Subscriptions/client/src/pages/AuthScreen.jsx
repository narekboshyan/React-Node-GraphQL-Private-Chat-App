import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { Fragment } from "react";
import { SIGNIN_USER, SIGNUP_USER } from "../graphql/mutations";

const AuthScreen = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({});
  const [showLogin, setShowLogin] = useState(true);
  const [signupUser, { data: signupQueryData, loading: l1, error: e1 }] = useMutation(SIGNUP_USER);
  const [sigInUser, { data: signInQueryData, loading: l2, error: e2 }] = useMutation(SIGNIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.signInUser.token);
      setIsLoggedIn(true);
    },
  });

  const authForm = useRef(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (l1 || l2) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6">Authenticating</Typography>
      </Box>
    );
  }

  const submitHandler = e => {
    e.preventDefault();
    if (showLogin) {
      sigInUser({
        variables: {
          signIn: formData,
        },
      });
    } else {
      signupUser({
        variables: {
          newUser: formData,
        },
      });
    }
  };

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={submitHandler}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card sx={{ padding: 10 }} variant="outlined">
        <Stack sx={{ width: 400 }} direction="column" spacing={2}>
          {signupQueryData && (
            <Alert severity="success">{signupQueryData.signupUser.firstName} Signed up</Alert>
          )}
          {e1 && <Alert severity="error">{e1.message}</Alert>}
          {e2 && <Alert severity="error">{e2.message}</Alert>}
          <Typography variant="h5">Please {showLogin ? "Login" : "Signup"}</Typography>
          {!showLogin && (
            <Fragment>
              <TextField
                label="First Name"
                variant="standard"
                name="firstName"
                onChange={handleChange}
                required
              />
              <TextField
                label="Last Name"
                variant="standard"
                name="lastName"
                onChange={handleChange}
                required
              />
            </Fragment>
          )}
          <TextField
            label="Email"
            variant="standard"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            name="password"
            onChange={handleChange}
            required
          />
          <Typography
            variant="subtitle1"
            textAlign="center"
            onClick={() => {
              setShowLogin(!showLogin);
              setFormData({});
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup" : "Login"}
          </Typography>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};
export default AuthScreen;
