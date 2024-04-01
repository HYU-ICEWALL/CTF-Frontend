import { useEffect, useState } from "react";
import { env } from "../env";

interface AuthProps {
  children: React.ReactNode;
}

function Auth(props: AuthProps) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetch(env.authServer, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          setAuth(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching auth:", error);
      });
  }, []);

  if (!auth) {
    return (
      <>
        <p>인증 확인 중입니다.</p>
      </>
    );
  }

  return <>{props.children}</>;
}

export default Auth;