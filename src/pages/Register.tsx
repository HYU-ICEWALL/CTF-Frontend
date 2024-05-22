import { useState } from "react";
import Form from "../components/Form.tsx";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [organization, setOrganization] = useState("");
  const [department, setDepartment] = useState("");

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

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.target.value);
  };

  const onDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    const id = username;
    const name = nickname;

    fetch("https://server.icewall.org/api/account/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
        email,
        name,
        organization,
        department,
      }),
    })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        res.json().then((data) => {
          if(data["code"] === 0){
            alert("회원가입에 성공했습니다.");
            window.location.href = "/login";
          } else {
            alert("회원가입에 실패했습니다.\n" + data["message"]);
          }
        });
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
          <label htmlFor="nickname">닉네임</label>
          <input
            required
            type="text"
            name="nickname"
            id="nickname"
            value={nickname}
            onChange={onNicknameChange}
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

          <label htmlFor="organization">소속</label>
          <input
            required
            type="text"
            name="organization"
            id="organization"
            value={organization}
            onChange={onOrganizationChange}
          />
          <label htmlFor="department">학과</label>
          <input
            required
            type="text"
            name="department"
            id="department"
            value={department}
            onChange={onDepartmentChange}
          />
          <input type="submit" value="등록"/>
        </Form>
      </div>
    </>
  );
}

export default Register;
