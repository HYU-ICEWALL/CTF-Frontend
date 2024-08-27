export interface CreateAccountDto {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export type Role = "admin" | "user" | "manager";

export interface AccountResponseDto {
  username: string;
  email: string;
  ip: string;
  role: Role;
}