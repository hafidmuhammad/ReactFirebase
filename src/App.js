import React, { useEffect } from "react";
import MainRoute from "./Route/MainRoute";
import { Box } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (prevUser) => {
      console.log('status Login', prevUser)

      // if (!prevUser && location.pathname !== "/register" && location.pathname !== '/forgetpassword' && location.pathname !== '/login/phone') {
      //   navigate("/login");
      // }

    });
    return () => unsub();
  }, [navigate, location.pathname]);


  return (
    <Box>
      {/* <LoginPage /> */}
      <MainRoute />
    </Box>
  );
}

export default App;
