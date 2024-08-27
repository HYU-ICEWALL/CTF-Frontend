import { createContext } from "react";
import { AuthContextProps } from "../dto/auth.dto";

export const AuthContext = createContext<AuthContextProps>({
  auth: undefined,
  setAuth: () => {},
});