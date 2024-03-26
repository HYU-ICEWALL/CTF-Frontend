import "../styles/Header.css";
import Logo from "../assets/logo.png";

interface HeaderProps {
  username: string;
  setUsername: (username: string) => void;
}

function Header(props: HeaderProps) {
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

          {(props.username === "Guest" ? <><a
            href="/login"
          >
            <li>Login</li>
          </a></> : <></>)}

          {(props.username === "Guest" ? <><a
            href="/register"
          >
            <li>Register</li>
          </a></> : <></>)}

          {(props.username === "Guest" ? <></> : <><a
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
