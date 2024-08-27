import { Route, Routes } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import ContestList from "./pages/ContestList.tsx";
import { useEffect, useState } from "react";
import { AuthContext } from "./contexts/auth.context.ts";
import Profile from "./pages/Profile.tsx";
import Admin from "./pages/admin/Admin.tsx";
import Manager from "./pages/manager/Manager.tsx";
import { checkAuth } from "./middlewares/user/auth.middleware.ts";
import Contest from "./pages/Contest.tsx";
import { AuthResponseDto } from "./dto/auth.dto.ts";

function App() {
  const [auth, setAuth] = useState<AuthResponseDto | undefined>(undefined);

  useEffect(() => {
    checkAuth().then((res) => {
      setAuth(res);        
    }).catch((err) => {
      console.log(err);
      setAuth(undefined);
    });
  }, []);

  console.log(auth);
  

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{auth, setAuth}}>
        <Header/>
        {
          auth ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contests" element={<ContestList />} />
            <Route path="/contest/:contest" element={<Contest />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="*" element={<NotFound />} />
            {
              (auth?.role === "admin") ?
              <Route path="/admin/*" element={<Admin />} /> : <></>
            }
            {
              (auth?.role === "manager") ?
              <Route path="/manager/*" element={<Manager />} /> : <></>
            }
          </Routes> :
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        }
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
