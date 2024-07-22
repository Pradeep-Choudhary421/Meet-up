import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import LoginDemo from "./Components/LoginDemo";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./Pages/UserProfile/UserProfile";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ToastContainer autoClose={1500} />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/loginDemo" element={<LoginDemo/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
      </Routes>  
    </BrowserRouter>
    </>
  );
};

export default App;
