import axios from "axios";
import { CreateAccountDto } from "../../dto/account.dto";
import { config } from "../../config";

export const createManagerAccount = async (CreateAccountDto: CreateAccountDto) => {
  return axios.post(`${config.API_URL}/account/manager`, CreateAccountDto);
}

export const getAccounts = async () => {
  return axios.get(`${config.API_URL}/account`).then((res) => res.data);
}

export const deleteAccount = async (username: string) => {
  return axios.delete(`${config.API_URL}/account/${username}`);
}