import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSite from "./components/MainSite";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mainSite/*" element={<MainSite></MainSite>}></Route>
        <Route exact path="/" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profileDetails" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
