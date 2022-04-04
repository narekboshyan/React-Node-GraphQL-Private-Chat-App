import React, { Fragment, useState } from "react";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") && true);

  return (
    <Fragment>
      {isLoggedIn ? (
        <HomeScreen setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </Fragment>
  );
};

export default App;
