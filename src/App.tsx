import { Route, Routes } from 'react-router';
import './App.css'
import { BrowserRouter } from 'react-router-dom';

import Home from './pages/Home.tsx';
import Scoreboard from './pages/Scoreboard.tsx';
import Problems from './pages/Problems.tsx';
import Login from './pages/Login.tsx';


import { useState } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

function App() {
  const [username, setUsername] = useState('');


  return (
    <>
      <Header username={username} setUsername={setUsername}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
