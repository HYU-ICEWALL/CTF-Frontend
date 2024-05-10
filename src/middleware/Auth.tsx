interface AuthProps {
  children: React.ReactNode;
}

function Auth(props: AuthProps) {
  if(!document.cookie.includes("sid")) {
      window.location.href = "/login";
      return null;
  }
  return <>{props.children}</>;
}

export default Auth;
