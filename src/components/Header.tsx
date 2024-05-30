import "../styles/Header.css";
import Logo from "../assets/logo.png";
import { useState } from "react";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [fetched, setFetched] = useState(false);

  if(loggedIn == false && document.cookie.includes("loggedin=true")) {
    setLoggedIn(true);
  }

  if(fetched == false) {
    setFetched(true);
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
        } else {
          setLoggedIn(false);
          document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
          document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }
      });
    });
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
