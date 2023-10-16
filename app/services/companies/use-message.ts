"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface IRequestConfig {
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
    headers: {
      "content-type": string,
    }
}
export interface IResponse<T> {
  data: T | null,
  isSuccess : boolean
  error: string, 
  isLoading: boolean
}


export function useData<T>(config: IRequestConfig){
  const [response, setResponse] = useState<IResponse<T>>({data: null, isSuccess: false, error: "", isLoading: true});

  const fetcher = async (config: AxiosRequestConfig) => await axios(config).then((res) => res.data);

  const {
    data,
    error,
    isLoading: isApiResponseLoading,
  } = useSWR(config, fetcher);

  useEffect(() => {
    if (isApiResponseLoading) {
      return;
    }

    if (error) {
      setResponse(() => 
        error.response && error.response.data
          ? {...response, error: JSON.stringify(error.response.data, null, 2), isSuccess: false, isLoading: false}
          : {...response, error: "Something went wrong", isSuccess: false, isLoading: false}
      );
    }

    if (data && data.data) {
      setResponse({data: data.data as T, isSuccess: true, error: "", isLoading: false});
    }
  }, [data, error, isApiResponseLoading]);

  return { response };
};