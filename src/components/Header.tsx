import "../styles/Header.css";
import Logo from "../assets/logo.png";

function Header() {
  const username = "Guest";
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

          {username === "Guest" ? (
            <>
              <a href="/login">
                <li>Login</li>
              </a>
            </>
          ) : (
            <></>
          )}

          {username === "Guest" ? (
            <>
              <a href="/register">
                <li>Register</li>
              </a>
            </>
          ) : (
            <></>
          )}

          {username === "Guest" ? (
            <></>
          ) : (
            <>
              <a href="/logout">
                <li>Logout</li>
              </a>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Header;
