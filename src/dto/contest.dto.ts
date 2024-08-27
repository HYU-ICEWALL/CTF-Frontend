export type ContestStatus = 'RUNNING' | 'FINISHED' | 'UPCOMING' | 'SUSPENDED'; 

export interface CreateContestDto {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface ContestInfoDto {
  _id: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: ContestStatus;
  organizer: string;
}

export interface ContestDto extends ContestInfoDto {
  problems: string[];
  participants: string[];
}
