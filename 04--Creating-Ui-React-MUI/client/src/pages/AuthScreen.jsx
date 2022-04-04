import React, { useRef, useState } from "react";
import { Box, Stack, Typography, Button, TextField, Card } from "@mui/material";
import { Fragment } from "react";

const AuthScreen = () => {
  const [formData, setFormData] = useState({});
  const [showLogin, setShowLogin] = useState(true);

  const authForm = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <Typography variant="h5">
            Please {showLogin ? "Login" : "Signup"}
          </Typography>
          {!showLogin && (
            <Fragment>
              <TextField
                label="First Name"
                variant="standard"
                name="firstName"
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                variant="standard"
                name="lastName"
                onChange={handleChange}
              />
            </Fragment>
          )}
          <TextField
            label="Email"
            variant="standard"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            name="password"
            onChange={handleChange}
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
