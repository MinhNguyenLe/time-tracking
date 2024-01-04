import { useState } from "react";
import useLoading from "./useLoading";

const useGetListStrategies = ({ onError, onSuccess }: any) => {
  const { isLoading, get: getV1 } = useLoading();
  const [strategies, setStrategies] = useState([]);

  const fetch = () => {
    return getV1({
      url: "/strategy/get-list",
      onError,
      onSuccess: (result: any) => {
        if (result?.data?.strategies) {
          setStrategies(result?.data?.strategies);
          onSuccess?.(result?.data?.strategies);
        }
      },
    });
  };

  return { isLoading, fetch, strategies };
};

export default useGetListStrategies;
