import "../styles/Header.css";
import Logo from "../assets/logo.png";
import { useState } from "react";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  if(loggedIn == false && localStorage.getItem("token") !== null) {
    setLoggedIn(true);
  }

  fetch("https://server.icewall.org/api/account/auth", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true", // Add this line
    },
    credentials: "include",
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data["code"] === 0) {
        setLoggedIn(true);
        localStorage.setItem("token", data["token"]);
      } else {
        setLoggedIn(false);
        localStorage.removeItem("token");
      }
    });
  });

  return (
    <>
      <nav>
        <ul>
          {/* <img src={Logo}></img> */}
          <a href="/">
            <li>Home</li>
          </a>
          <a href="/scoreboard">
            <li>Scoreboard</li>
          </a>
          <a href="/problems">
            <li>Problems</li>
          </a>
          <a href="/submissions">
            <li>Submissions</li>
          </a>
          <div className="padding"></div>

          {(loggedIn === false ? <><a
            href="/login"
          >
            <li>Login</li>
          </a></> : <></>)}

          {(loggedIn === false ? <><a
            href="/register"
          >
            <li>Register</li>
          </a></> : <></>)}

          {(loggedIn === false ? <></> : <><a
            href="/logout"
          >
            <li>Logout</li>
          </a></>)}
        </ul>
      </nav>
    </>
  );
}

export default Header;
