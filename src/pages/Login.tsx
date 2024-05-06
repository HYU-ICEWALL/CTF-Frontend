import { useState } from "react";
import Form from "../components/Form.tsx";

interface LoginProp {
  username: string;
  setUsername: (username: string) => void;
}

function Login(props: LoginProp) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    console.log(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    fetch("http://server.icewall.org:9999/api/account/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
    .then((res) => {
      if (res.ok) {
        alert("로그인에 성공했습니다.");
        props.setUsername(id);
        
      } else {
        alert("로그인에 실패했습니다.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("로그인에 실패했습니다.");
    });
  }

  return (
    <>
      <div>
        <Form submitHandler={submitHandler}>
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
        </Form>
      </div>
    </>
  );
}

export default Login;
