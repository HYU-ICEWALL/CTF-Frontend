function Logout() {
  // remove sid cookie

  fetch("https://server.icewall.org/api/account/logout", {}).then((res) => {
    document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  });

  return <></>;
}

export default Logout;
