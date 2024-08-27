import axios from "axios";
import { AuthCredentialsDto } from "../../dto/auth.dto";
import { config } from "../../config";


export const login = async (authCredentialsDto: AuthCredentialsDto) => {
  return axios.post(`${config.API_URL}/auth/login`, authCredentialsDto);
}

export const logout = async () => {
  return axios.post(`${config.API_URL}/auth/logout`);
}

export const checkAuth = async () => {
  return axios.get(`${config.API_URL}/auth`).then((res) => res.data);
}

export const refreshToken = async () => {
  return axios.post(`${config.API_URL}/auth/refresh`);
}