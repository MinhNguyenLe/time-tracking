import apiV1 from "@/modules/axios";
import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const method = (
    { url, bodyParams, onError, onSuccess }: any,
    method: "get" | "post" | "delete" | "put"
  ) => {
    setIsLoading(true);

    return apiV1[method](url, bodyParams)
      .then((result) => {
        setIsLoading(false);

        onSuccess?.(result);
      })
      .catch((error) => {
        setIsLoading(false);

        onError?.(error);
        console.log(error);
      });
  };

  const post = (params: any) => method(params, "post");
  const get = (params: any) => method(params, "get");
  const put = (params: any) => method(params, "put");

  return { isLoading, post, get, put };
};

export default useLoading;
