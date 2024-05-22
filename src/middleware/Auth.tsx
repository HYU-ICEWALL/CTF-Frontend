import { useState } from "react";

interface AuthProps {
  children: React.ReactNode;
}

function Auth(props: AuthProps) {
  const [isAuth, setIsAuth] = useState(false);

  fetch("/api/account/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  }).then((res) => {
    res.json().then((data) => {
      if (data["code"] === 0) {
        setIsAuth(true);
      } else {
        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.href = "/login";
      }
    });
  });
  
  return (
    <>
      {isAuth ? props.children : <></>}
    </>
  );
}

export default Auth;
