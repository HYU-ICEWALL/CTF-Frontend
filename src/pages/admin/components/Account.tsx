import { useEffect, useRef, useState } from "react";
import { AccountResponseDto } from "../../../dto/account.dto";
import { deleteAccount, getAccounts } from "../../../middlewares/admin/account.middleware";
import AccountModal from "./AccountModal";

function Account() {
  const accountsRef = useRef<AccountResponseDto[]>([]);
  const [ accounts, setAccounts ] = useState<AccountResponseDto[]>([]);
  const [ query, setQuery ] = useState<string>("");
  const [ modal, setModal ] = useState<boolean>(false);

  useEffect(() => {
    refreshAccounts();
  }, [modal]);



  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    
    if (e.target.value === "") {
      setAccounts(accountsRef.current);
      return;
    }

    const filteredAccounts = accountsRef.current.filter((account) => {
      return account.username.includes(e.target.value) || account.email.includes(e.target.value) || account.role.includes(e.target.value);
    });

    setAccounts(filteredAccounts);
  }

  const refreshAccounts = () => {
    getAccounts().then((res) => {
      accountsRef.current = res;
      setAccounts(res);
    }).catch((err) => {
      console.log(err);
      alert("계정을 불러오는데 실패했습니다.");
    });
  }

  const createBtnHandler = () => {
    setModal(true);
  }

  const deleteBtnHandler = (username: string) => {
    deleteAccount(username).then(() => {
      alert(`${username} 계정이 삭제되었습니다.`);
      refreshAccounts();
    }).catch((err) => {
      console.log(err);
      alert(`${username} 계정 삭제에 실패했습니다.`);
    });
  }

  return (
    <>
      <div className="bar">
        <input type="search" placeholder="검색어를 입력하세요." value={query} onChange={onChange} />
        <button onClick={refreshAccounts}>새로고침</button>
        <button onClick={createBtnHandler}>추가</button>
      </div>
      {
        accounts.map((account:AccountResponseDto, index:number) => {
          return (
            <div className="account" key={index}>
              <h3>{account.username}</h3>
              <h4>{account.email}</h4>
              <h4>{account.role}</h4>
              <button onClick={() => {deleteBtnHandler(account.username)}}>삭제</button>
            </div>
          );
        })
      }
      <AccountModal visible={modal} setVisible={setModal}/>
    </>
  );
}

export default Account;