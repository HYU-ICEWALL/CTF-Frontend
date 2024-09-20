import { ProblemHeaderResponseDto } from "./problem.dto";
import { ProfileHeaderResponseDto } from "./profile.dto";

export const ContestStatusArr = ['PENDING', 'RUNNING', 'FINISHED', 'UPCOMING', 'SUSPENDED'] as const;
export type ContestStatus = typeof ContestStatusArr[number];

export interface CreateContestDto {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface UpdateContestDto {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: ContestStatus;
}

export interface ContestInfoDto {
  _id: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: ContestStatus;
  host: string;
}

export interface ContestDto extends ContestInfoDto {
  problems: string[];
  participants: string[];
}

export type ContestSortType = "name" | "startTime" | "endTime" | "host";
export type ContestSortOrder = "asc" | "desc";

export interface ContestConditions {
  name?: string;
  page: number;
  limit: number;
  sort?: ContestSortType;
  order: ContestSortOrder;
}


export interface ContestHeaderResponseDto {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  host: string;
  status: ContestStatus;
}

export interface ContestInfoResponseDto extends ContestHeaderResponseDto {
  description: string;
}

export interface ContestResponseDto extends ContestInfoResponseDto {
  problems: Array<string>;
  participants: Array<string>;
}
export interface PopulateContestResponseDto extends ContestInfoResponseDto {
  problems: Array<ProblemHeaderResponseDto>;
  participants: Array<ProfileHeaderResponseDto>;
}

export interface ContestPageResponseDto {
  limit: number;
  page: number;
  total: number;
  contests: ContestHeaderResponseDto[];
}