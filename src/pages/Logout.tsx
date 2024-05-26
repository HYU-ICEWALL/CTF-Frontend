function Logout() {
  // remove sid cookie

  fetch("https://server.icewall.org/api/account/logout", {}).then((res) => {
    document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.href = "/";
  });

  return <></>;
}

export default Logout;
