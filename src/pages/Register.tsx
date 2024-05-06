import { useState } from "react";
import Form from "../components/Form.tsx";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    const id = username;

    fetch("https://server.icewall.org/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
        email,
      }),
    })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        alert("회원가입에 성공했습니다.");
        window.location.href = "/login";
      } else {
        alert("회원가입에 실패했습니다.");
      }
    })
    .catch((err) => {
      console.error(err);
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <>
      <div>
        <Form submitHandler={submitHandler}>
          <label htmlFor="username">아이디</label>
          <input
            required
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={onUsernameChange}
          />
          <label htmlFor="password">패스워드</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          />
          <label htmlFor="passwordConfirm">패스워드 확인</label>
          <input
            required
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onPasswordConfirmChange}
          />
          <label htmlFor="email">이메일</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onEmailChange}
          />
          <input type="submit" value="등록"/>
        </Form>
      </div>
    </>
  );
}

export default Register;
