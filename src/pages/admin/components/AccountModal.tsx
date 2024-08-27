import React, { useState } from "react";
import { CreateAccountDto } from "../../../dto/account.dto";
import { createManagerAccount } from "../../../middlewares/admin/account.middleware";

export interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccountModal(modalProps: ModalProps) {
  const [account, setAccount] = useState<CreateAccountDto>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const { username, password, confirmPassword, email } = account;
  
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createManagerAccount(account).then(() => {
      alert("계정이 생성되었습니다.");
      modalProps.setVisible(false);
      setAccount({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });
    }).catch((err) => {
      console.log(err);
      alert("계정 생성에 실패했습니다.");
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
    <div className="modal" hidden={!modalProps.visible}>
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
          <input type="submit" value="등록" />
          <button 
            onClick={() => {modalProps.setVisible(false)}}
          >취소</button>
        </form>
      </div>
    </div>
  );
}

export default AccountModal;