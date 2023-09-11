import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSite from "./components/MainSite";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ProfileDetails from "./components/ProfileDetails";
import Leagues from "./components/Leagues";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/mainSite/*"
            element={<MainSite setMode={setMode} mode={mode}></MainSite>}
          ></Route>
          <Route exact path="/" element={<LogIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/profileDetails/:login"
            element={<ProfileDetails setMode={setMode} mode={mode} />}
          />
          <Route path="/leagues" element={<Leagues />} />
          <Route
            path="/users"
            element={<Users setMode={setMode} mode={mode} />}
          />
          <Route
            path="/users/:id"
            element={<SingleUser setMode={setMode} mode={mode} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
