import { Route, Routes } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Scoreboard from "./pages/Scoreboard.tsx";
import Problems from "./pages/Problems.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout.tsx";

import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Admin from "./pages/Admin.tsx";

function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin adminToken="DummyToken" />} />
          <Route path="/" element={<Home />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/problems" element={<Problems/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
