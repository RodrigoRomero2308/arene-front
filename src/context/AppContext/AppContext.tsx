import { createContext, Dispatch, SetStateAction } from "react";

export interface IAppContext {
  appLoading: boolean;
  setAppLoading: Dispatch<SetStateAction<boolean>>;
}

const appContext = createContext<IAppContext>({
  appLoading: false,
  setAppLoading: () => false,
});

export default appContext;
