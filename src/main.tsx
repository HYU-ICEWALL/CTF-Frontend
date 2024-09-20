import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { config } from "./config.ts";

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  // console.log(config);

  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
});

axios.interceptors.response.use((config) => {
  // console.log(config);

  return config;
}, async (error) => {
  const { response } = error;
  console.error(response);
  
  if (!response) {
    return Promise.reject(error);
  }

  // if (response?.status === 401 && response?.data?.message !== "Invalid credentials") {
  //   alert("로그인이 필요합니다.");
  // }

  if (response?.status === 403) {
    alert("접근 권한이 없습니다.");
    window.history.back();
  }

  if (response?.status === 500) {
    alert("서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.");
  }

  return Promise.reject(error);
});

console.log = config.DEV_MODE ? console.log : () => {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
);
