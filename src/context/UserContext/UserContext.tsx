import { IAuthenticatedUser } from "@/interfaces/IAuthenticatedUser";
import { createContext, Dispatch, SetStateAction } from "react";

export interface IUserContext {
  user: IAuthenticatedUser | undefined;
  setUser: Dispatch<SetStateAction<IAuthenticatedUser | undefined>>;
}

const userContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => undefined,
});

export default userContext;
