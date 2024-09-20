import axios from "axios";
import { config } from "../../config";
import { ContestResponseDto, CreateContestDto, UpdateContestDto } from "../../dto/contest.dto";

export const getContestById = async (contestId: string): Promise<ContestResponseDto> => {
  return axios.get(`${config.API_URL}/contest/${contestId}`).then((res) => res.data);
}

export const createContest = async (createContestDto: CreateContestDto): Promise<void> => {
  return axios.post(`${config.API_URL}/contest`, createContestDto).then((res) => res.data);
}

export const updateContest = async (contestId: string, updateContestDto: UpdateContestDto): Promise<void> => {
  return axios.put(`${config.API_URL}/contest/${contestId}`, updateContestDto).then((res) => res.data);
}

export const deleteContest = async (contestId: string): Promise<void> => {
  return axios.delete(`${config.API_URL}/contest/${contestId}`).then((res) => res.data);
}

export const updateProblemInContest = async (contestId: string, problems: string[]): Promise<void> => {
  return axios.put(`${config.API_URL}/contest/${contestId}/problems`, problems).then((res) => res.data);
}