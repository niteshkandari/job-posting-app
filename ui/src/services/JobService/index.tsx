import React, { createContext, useContext, ReactNode } from "react";
import HttpService from "../HttpService";
import { API_URL } from "./Api-url-enum";
import { AxiosResponse } from "axios";

interface JobServiceContextProps {
  createJob: (data: any) => Promise<AxiosResponse>;
  getAllJobs: () => Promise<AxiosResponse>;
  getJobById: (id: string) => Promise<AxiosResponse>;
  updateJob: (id: string, data: any) => Promise<AxiosResponse>;
  purgeJob: (id: string) => Promise<AxiosResponse>;
  searchJob:(param: any) => Promise<AxiosResponse>;
}


const httpServiceInstance = new HttpService();
const JobServiceContext = createContext<JobServiceContextProps | undefined>(undefined);

interface jobServiceProviderProps {
  children: ReactNode;
}

export const JobServiceProvider: React.FC<jobServiceProviderProps> = ({ children }) => {

  const createJob = (data: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.post(API_URL.CREATE_JOB, data);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getAllJobs = (): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.get(API_URL.GET_ALL_JOBS);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getJobById = (id: string): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.get(
          API_URL.GET_JOB_BY_ID + "/" + `${id}`
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateJob = (id: string, data: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.put(
          API_URL.GET_JOB_BY_ID + "/" + `${id}`,
          data
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const purgeJob = (id: string): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.delete(
          API_URL.GET_JOB_BY_ID + "/" + `${id}`
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const searchJob = (param:any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await httpServiceInstance.get(
          API_URL.SEARCH_JOBS  + `?query=${param}`
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  const operationsAllowed: JobServiceContextProps = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    purgeJob,
    searchJob
  };

  return (
    <JobServiceContext.Provider value={operationsAllowed}>
      {children}
    </JobServiceContext.Provider>
  );
};

export const useJobService = (): JobServiceContextProps => {
  const context = useContext(JobServiceContext);
  if (context === undefined) {
    throw new Error("useJobService must be used within a JobServiceProvider");
  }
  return context;
};
