import axios from "axios";
import { config } from "../../config";
import { CreateProblemDto, ProblemConditions, ProblemPageResponseDto, ProblemResponseDto } from "../../dto/problem.dto";

const queryString = (conditions: ProblemConditions): string => {
  let queryString = "";
  conditions.name ? queryString += `&name=${conditions.name}` : null;
  conditions.domain ? queryString += `&domain=${conditions.domain}` : null;
  conditions.difficulty ? queryString += `&difficulty=${conditions.difficulty}` : null;
  conditions.page ? queryString += `&page=${conditions.page}` : null;
  conditions.limit ? queryString += `&limit=${conditions.limit}` : null;
  conditions.sort ? queryString += `&sort=${conditions.sort}` : null;
  conditions.order ? queryString += `&order=${conditions.order}` : null;

  return queryString;
}

export const getProblemWithId = async (id: string): Promise<ProblemResponseDto> => {
  return axios.get(`${config.API_URL}/problem/${id}`).then((res) => res.data);
}

export const getProblemsWithConditions = async (conditions: ProblemConditions): Promise<ProblemPageResponseDto> => {
  const query = queryString(conditions);
  return axios.get(`${config.API_URL}/problem?${query}`).then((res) => res.data);
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