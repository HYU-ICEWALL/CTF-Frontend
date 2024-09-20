import axios from "axios"
import { config } from "../../config"
import { ContestConditions, ContestPageResponseDto, PopulateContestResponseDto } from "../../dto/contest.dto";
import { ProblemInfoResponseDto } from "../../dto/problem.dto";

const queryString = (conditions: ContestConditions): string => {
  let queryString = "";
  Object.keys(conditions).forEach((key) => {
    const value = conditions[key as keyof ContestConditions];
    if (value) {
      queryString += `&${key}=${value}`;
    }
  });

  return queryString;
}

export const getContestPage = async (page: number, limit: number): Promise<ContestPageResponseDto> => {
  const res = await axios.get(`${config.API_URL}/contest?page=${page}&limit=${limit}`);
  return res.data;
}
export const getContestByConditions = async (conditions: ContestConditions): Promise<any> => {
  const query = queryString(conditions);
  return axios.get(`${config.API_URL}/contest?${query}`).then((res) => res.data);
}


export const getPopulatedContestById = async (contestId: string): Promise<PopulateContestResponseDto> => {
  return axios.get(`${config.API_URL}/contest/${contestId}/populate`).then((res) => res.data);
}

export const registerContest = async (contestId: string): Promise<void> => {
  return axios.put(`${config.API_URL}/contest/${contestId}/register`).then((res) => res.data);
}

export const unregisterContest = async (contestId: string): Promise<void> => {
  return axios.put(`${config.API_URL}/contest/${contestId}/unregister`).then((res) => res.data);
}

export const getContestProblemById = async (contestId: string, problemId: string): Promise<ProblemInfoResponseDto> => {
  return axios.get(`${config.API_URL}/contest/${contestId}/problem/${problemId}`).then((res) => res.data);
}