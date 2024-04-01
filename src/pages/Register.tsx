import { useState } from "react";
import Form from "../components/Form.tsx";

import { env } from "../env.tsx";

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    if(password.length < 8){
      alert("패스워드는 8자리 이상이어야 합니다.");
      return;
    }

    if(password.search(/[a-z]/) < 0){
      alert("패스워드는 영문 소문자를 포함해야 합니다.");
      return;
    }

    if(password.search(/[A-Z]/) < 0){
      alert("패스워드는 영문 대문자를 포함해야 합니다.");
      return;
    }

    if(password.search(/[0-9]/) < 0){
      alert("패스워드는 숫자를 포함해야 합니다.");
      return;
    }

    if(password.search(/[!@#$%^&*]/) < 0){
      alert("패스워드는 특수문자를 포함해야 합니다.");
      return;
    }

    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("email", email);

    fetch(`${env.registerServer}`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("등록 성공");
        } else {
          alert("등록 실패");
        }
      });


  };

  return (
    <>
      <div>
        <Form action={onSubmit}>
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
          <input type="submit" value="등록" />
        </Form>
      </div>
    </>
  );
}

export default Register;
