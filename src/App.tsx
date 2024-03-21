import { Route, Routes } from 'react-router';
import './App.css'
import { BrowserRouter } from 'react-router-dom';

import Home from './pages/Home.tsx';
import Scoreboard from './pages/Scoreboard.tsx';
import Problems from './pages/Problems.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/problems" element={<Problems />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
