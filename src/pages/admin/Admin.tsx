import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthResponseDto } from "../../dto/auth.dto";
import { checkAuth } from "../../middlewares/user/auth.middleware";
import Container from "../../components/Container";
import Account from "./components/Account";

function Admin() {
  const navigate = useNavigate(); 
  const [ auth, setAuth ] = useState<AuthResponseDto | undefined>(undefined);
  useEffect(() => {
    checkAuth().then((res) => {
      if(res.role !== "admin") {
        alert("어드민만 접근 가능합니다.");
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
        "Account" : <Account />
      },
    ]}/>
  );
}

export default Admin;
