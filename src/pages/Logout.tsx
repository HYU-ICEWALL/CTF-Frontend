function Logout() {
  // remove sid cookie

  fetch("/api/account/logout", {}).then((res) => {
    document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  });

  return <></>;
}

export default Logout;
