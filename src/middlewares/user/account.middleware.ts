import axios from "axios";
import { config } from "../../config";
import { CreateAccountDto } from "../../dto/account.dto";

export const register = async (createAccountDto: CreateAccountDto) => {
  return axios.post(`${config.API_URL}/account`, createAccountDto);
}
