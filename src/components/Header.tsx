import "../styles/Header.css";
import Logo from "../assets/logo.png";
import { useState } from "react";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  if(document.cookie.includes("sid") && loggedIn === false) {
    setLoggedIn(true);
  }

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
