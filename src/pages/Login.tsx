import { useContext, useState } from "react";
import { checkAuth, login } from "../middlewares/user/auth.middleware.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context.ts";
import "../styles/Form.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await login({
      username: id,
      password: password,
    }).then(() => {
      checkAuth().then((res) => {
        setAuth(res);
        navigate("/", { replace: true });
      }).catch(() => {
        alert("로그인에 실패했습니다. 관리자에게 문의하세요.");
        setAuth(undefined);
      });
    }).catch(() => {
      alert("로그인에 실패했습니다. 아이디와 패스워드를 확인하세요.");
    });
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            name="username"
            id="username"
            value={id}
            onChange={onUsernameChange}
            required
          />
          <label htmlFor="password">패스워드</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            required
          />
          <input type="submit" value="로그인" />
          <a href="/">Forgot Password?</a>
        </form>
      </div>
    </>
  );
}

export default Login;
