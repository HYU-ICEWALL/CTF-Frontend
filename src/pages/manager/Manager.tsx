import { useNavigate } from "react-router-dom";
import { AuthResponseDto } from "../../dto/auth.dto";
import { useEffect, useState } from "react";
import { checkAuth } from "../../middlewares/user/auth.middleware";
import Container from "../../components/Container";
import Problem from "./components/Problem";
import Contest from "./components/Contest";

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
    }).catch(() => {
      navigate("/", { replace: true });
    });
  }, []);
  
  return (
    <Container children={[
      {
        "Contest" : <Contest />
      },
      {
        "Problem" : <Problem />
      }
    ]}/>
  );
}

export default Manager;