import { useNavigate } from "react-router-dom";
import { AuthResponseDto } from "../../dto/auth.dto";
import { useEffect, useState } from "react";
import { checkAuth } from "../../middlewares/user/auth.middleware";
import Container from "../../components/Container";
import ProblemManager from "./components/ProblemManager";
import ContestManager from "./components/ContestManager";

function Manager() {
  const navigate = useNavigate();
  const [ auth, setAuth ] = useState<AuthResponseDto | undefined>(undefined);
  useEffect(() => {
    checkAuth().then((res) => {
      if (res.role !== "manager") {
        alert("관리자만 접근 가능합니다.");
        navigate("/", { replace: true });
        return;
      }
      setAuth(res);
    }).catch((err) => {
      console.log(err);
      alert(err.message);
      navigate("/", { replace: true });
    });
  }, []);
  
  return (
    <Container children={[
      {
        "Contest" : <ContestManager />
      },
      {
        "Problem" : <ProblemManager />
      }
    ]}/>
  );
}

export default Manager;