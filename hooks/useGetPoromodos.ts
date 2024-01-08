import { useState } from "react";
import useLoading from "./useLoading";

const useGetPoromodos = ({ onError, onSuccess }: any) => {
  const { isLoading, get: getV1 } = useLoading();
  const [poromodos, setPoromodos] = useState([]);

  const fetch = () => {
    return getV1({
      url: "/poromodo/get-list",
      onError,
      onSuccess: (result: any) => {
        if (result?.data?.poromodos) {
          setPoromodos(result?.data?.poromodos);
          onSuccess?.(result?.data?.poromodos);
        }
      },
    });
  };

  return { isLoading, fetch, poromodos };
};

export default useGetPoromodos;
