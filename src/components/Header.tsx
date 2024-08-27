import { useContext } from "react";
import "../styles/Header.css";
import { logout } from "../middlewares/user/auth.middleware";
import { AuthContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";

function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  const logoutHandler = () => {
    logout().finally(() => {
      setAuth(undefined);
      window.location.href = "/";
    });
  };
  
  return (
    <>
      <nav>
        <ul>
          {/* <img src={Logo}></img> */}
          <Link to="/">
            <li>Home</li>
          </Link>
          {
            (auth?.role === "user") ? 
            <Link to="/contests">
              <li>Contests</li>
            </Link> : <></>
          }
          {
            (auth?.role === "admin") ?
            <Link to="/admin">
              <li>Admin</li>
            </Link> : <></>
          }
          {
            (auth?.role === "manager") ?
            <Link to="/manager">
              <li>Manager</li>
            </Link> : <></>
          }
          <div className="padding"></div>

          {(auth === undefined ? <><Link
            to="/login"
          >
            <li>Login</li>
          </Link></> : <></>)}

          {(auth === undefined ? <><Link
            to="/register"
          >
            <li>Register</li>
          </Link></> : <></>)}

          {(auth === undefined ? <></> : <><Link
            to="/profile"
            style={{ cursor: "pointer" }}
          >
            <li>Profile</li>
          </Link>
          <Link to="/"
            onClick={logoutHandler}
            style={{ cursor: "pointer" }}
          >
            <li>Logout</li>
          </Link>
          </>)}
        </ul>
      </nav>
    </>
  );
}

export default Header;
