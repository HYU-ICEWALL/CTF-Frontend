interface AuthProps {
  children: React.ReactNode;
  username: string;
}

function Auth(props: AuthProps) {
  console.log(props.username);
  if(props.username === "Guest") {
      window.location.href = "/login";
      return null;
  }
  return <>{props.children}</>;
}

export default Auth;
