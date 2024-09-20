import axios from "axios";
import { config } from "../../config";
import { CreateProblemDto, ProblemConditions, ProblemHeaderResponseDto, ProblemPageResponseDto, ProblemResponseDto } from "../../dto/problem.dto";

const queryString = (conditions: ProblemConditions): string => {
  let queryString = "";
  Object.keys(conditions).forEach((key) => {
    const value = conditions[key as keyof ProblemConditions];
    if(value) {
      queryString += `&${key}=${value}`;
    }
  });
  
  return queryString;
}

export const getProblemWithId = async (id: string): Promise<ProblemResponseDto> => {
  return axios.get(`${config.API_URL}/problem/${id}`).then((res) => res.data);
}

export const getProblemPageWithConditions = async (conditions: ProblemConditions): Promise<ProblemPageResponseDto> => {
  const query = queryString(conditions);
  return axios.get(`${config.API_URL}/problem?${query}`).then((res) => res.data);
}

export const getAllProblems = async (): Promise<ProblemHeaderResponseDto[]> => {
  return axios.get(`${config.API_URL}/problem/all`).then((res) => res.data);
}

export const deleteProblem = async (id: string) : Promise<void> => {
  return axios.delete(`${config.API_URL}/problem/${id}`).then((res) => res.data);
}

export const createProblem = async (createProblemDto: CreateProblemDto) : Promise<void> => {
  return axios.post(`${config.API_URL}/problem`, createProblemDto).then((res) => res.data);
}

export const updateProblem = async (id: string, createProblemDto: CreateProblemDto) : Promise<void> => {
  return axios.put(`${config.API_URL}/problem/${id}`, createProblemDto).then((res) => res.data);
}