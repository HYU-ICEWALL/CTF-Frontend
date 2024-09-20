import React, { useState } from "react";
import { register } from "../middlewares/user/account.middleware.ts";
import { CreateAccountDto } from "../dto/account.dto.ts";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function Register() {
  const [account, setAccount] = useState<CreateAccountDto>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const navigate = useNavigate();

  const { username, password, confirmPassword, email } = account;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(account).then(() => {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    }).catch((err) => {
      console.log(err);
      alert("회원가입에 실패했습니다. 관리자에게 문의하세요.");
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <label htmlFor="username">아이디</label>
          <input
            required
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={onChange}
          />
          <label htmlFor="password">패스워드</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <label htmlFor="confirmPassword">패스워드 확인</label>
          <input
            required
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          />
          <label htmlFor="email">이메일</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <input type="submit" value="등록"/>
        </form>
      </div>
    </>
  );
}

export default Register;
