export interface ProfileDto {
  _id: string;
  account: string;
  name: string;
  organization: string;
  department: string;
  solvedProblems: string[];
  initialized: boolean;
  role: string;
}

export interface UpdateProfileDto {
  name: string;
  organization: string;
  department: string;
}


export interface ProfileHeaderResponseDto {
  _id: string;
  name: string;
}

export interface ProfileInfoResponseDto extends ProfileHeaderResponseDto {
  organization: string;
  department: string;
}

export interface ProfileResponseDto extends ProfileInfoResponseDto {
  account: string;
}