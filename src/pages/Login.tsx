import { useState } from "react";
import Form from "../components/Form.tsx";
import { env } from "../env.tsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    fetch(`${env.loginServer}`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("로그인 성공");
        } else {
          alert("로그인 실패");
        }
      });
  };

  return (
    <>
      <div>
        <Form action={onSubmit}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
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
        </Form>
      </div>
    </>
  );
}

export default Login;
