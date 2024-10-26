import { createContext } from "react";
import { JUser } from "../types/user";

export const AuthContext = createContext<JUser | undefined>(undefined);


