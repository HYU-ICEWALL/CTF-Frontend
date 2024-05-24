import { useState } from "react";
import Form from "../components/Form.tsx";

function Login() {
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

    fetch("/api/account/login", {
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
        res.json().then((data) => {
          if(data["code"] === 0){
            alert("로그인에 성공했습니다.");
            window.location.href = "/";
          } else {
            alert("로그인에 실패했습니다.\n" + data["message"]);
          }
        });

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
      <div className="form-container">
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
