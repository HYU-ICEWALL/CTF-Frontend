export const ProblemDomainArr = ['PWN', 'REVERSE', 'WEB', 'FORENSIC', 'MISC']
export type ProblemDomain = typeof ProblemDomainArr[number];

export const ProblemDifficultyArr = ['EASY', 'MEDIUM', 'HARD', 'INSANE']
export type ProblemDifficulty = typeof ProblemDifficultyArr[number];

export const ProblemStatusArr = ['ACCEPTED', 'REJECTED', 'PENDING']
export type ProblemStatus = typeof ProblemStatusArr[number];

export interface CreateProblemDto {
  name: string;
  description: string;
  uri: string;
  score: number;
  domain: ProblemDomain;
  difficulty: ProblemDifficulty;
  flag: string;
}

export interface UpdateProblemDto {
  name: string;
  description: string;
  flag: string;
  uri: string;
  score: number;
  domain: ProblemDomain;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
}

export type ProblemSortType = "name" | "domain" | "difficulty";
export type ProblemSortOrder = "asc" | "desc";

export interface ProblemConditions {
  name?: string;
  domain?: ProblemDomain;
  difficulty?: ProblemDifficulty;
  page: number;
  limit: number;
  sort?: ProblemSortType;
  order: ProblemSortOrder;
};

export interface ProblemHeaderResponseDto {
  _id: string;
  name: string;
  domain: ProblemDomain;
  difficulty: ProblemDifficulty;
  status: ProblemStatus;
}

export interface ProblemInfoResponseDto extends ProblemHeaderResponseDto {
  description: string;
  uri: string;
  score: number;
  status: ProblemStatus;
}

export interface ProblemResponseDto extends ProblemInfoResponseDto {
  flag: string;
}

export interface ProblemPageResponseDto {
  problems: ProblemHeaderResponseDto[];
  total: number
  page: number;
  limit: number;
}
