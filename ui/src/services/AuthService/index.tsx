import React, { createContext, useContext, ReactNode } from "react";
import HttpService from "../HttpService";
import { API_URL } from "./Api-url-enum";
import { AxiosResponse } from "axios";
import { getLocalItems, purgeLocalItems, storeLocalItems } from "../../utils";

interface UserServiceContextProps {
  userSignIn: (userCredentials: any) => Promise<AxiosResponse>;
  userSignUp: (userData: any) => Promise<AxiosResponse>;
  userSignOut: () => void;
  userUpdate: (params: { id: string; data: any }) => Promise<AxiosResponse>;
  forgotPassword: (email: string) => Promise<AxiosResponse>;
  isUserLoggedIn: () => boolean;
  getUserData: () => any;
}

const UserServiceContext = createContext<UserServiceContextProps | undefined>(undefined);
const httpServiceInstance = new HttpService();

interface UserServiceProviderProps {
  children: ReactNode;
}

export const UserServiceProvider: React.FC<UserServiceProviderProps> = ({ children }) => {
  const userSignIn = (userCredentials: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.post(API_URL.SIGN_IN, userCredentials);
        storeLocalItems("userCredentials", response?.data), resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const userSignUp = (userData: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.post(API_URL.SIGN_UP, userData);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const userUpdate = ({
    id,
    data,
  }: {
    id: string;
    data: any;
  }): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.patch(
          `${API_URL.USER_UPDATE}/${id}`,
          data
        );
        // dispatch(setUserData(response.data));
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const userSignOut = (): void => {
    purgeLocalItems("userCredentials") 
    document.location.reload();
  };


  const forgotPassword = (email: string): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.post(API_URL.FORGOT_PASSWORD, {
          email,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const isUserLoggedIn = () => {
    return getLocalItems("userCredentials")?.token ? true : false;
  };

  const getUserData = () => getLocalItems("userCredentials");

  const operationsAllowed: UserServiceContextProps = {
    userSignIn,
    userSignUp,
    userSignOut,
    userUpdate,
    forgotPassword,
    isUserLoggedIn,
    getUserData,
  };

  return (
    <UserServiceContext.Provider value={operationsAllowed}>
      {children}
    </UserServiceContext.Provider>
  );
};

export const useUserService = (): UserServiceContextProps => {
  const context = useContext(UserServiceContext);
  if (context === undefined) {
    throw new Error("useUserService must be used within a UserServiceProvider");
  }
  return context;
};
