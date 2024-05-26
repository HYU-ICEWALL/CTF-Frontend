import { useState } from "react";

interface AuthProps {
  children: React.ReactNode;
}

function Auth(props: AuthProps) {
  const [isAuth, setIsAuth] = useState(false);

  fetch("/api/account/auth", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true", // Add this line
    },
    credentials: "include",
  }).then((res) => {
    res.json().then((data) => {
      if (data["code"] === 0) {
        setIsAuth(true);
        document.cookie = "loggedin=true; path=/;"
      } else {
        setIsAuth(false);
        document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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
