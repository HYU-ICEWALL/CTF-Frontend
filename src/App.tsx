import { Route, Routes } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Scoreboard from "./pages/Scoreboard.tsx";
import Problems from "./pages/Problems.tsx";
import Login from "./pages/Login.tsx";

import { useState } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Admin from "./pages/Admin.tsx";

function App() {
  const [username, setUsername] = useState(document.cookie.includes("session") ? "User" : "Guest");

  return (
    <>
      <Header username={username} setUsername={setUsername} />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin adminToken="DummyToken" />} />
          <Route path="/" element={<Home />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/problems" element={<Problems username={username} />} />
          <Route path="/login" element={<Login username={username} setUsername={setUsername}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
