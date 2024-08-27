import axios from "axios"
import { config } from "../../config"
import { ContestDto } from "../../dto/contest.dto";

export const getAllContests = async (): Promise<ContestDto[]> => {
  const resposne = await axios.get<ContestDto[]>(`${config.API_URL}/contest`);
  return resposne.data;
}