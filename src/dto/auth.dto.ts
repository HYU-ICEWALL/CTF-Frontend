import React from "react";
import { Role } from "./account.dto";

// used when login
export interface AuthCredentialsDto {
  username: string;
  password: string;
}

// used when check token
export interface AuthContextProps {
  auth: AuthResponseDto | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthResponseDto | undefined>>;
}


export interface AuthResponseDto {
  profile: string;
  role: Role;
}