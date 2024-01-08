import { useState, useMemo } from "react";
import useLoading from "./useLoading";
import { sortByArrayCreatedAt } from "@/utils/utils";

const useGetDetailsChangedStrategy = ({ onError, onSuccess }: any) => {
  const { isLoading, get: getV1 } = useLoading();
  const [changedHistory, setChangedHistory] = useState<any>([]);
  const [poromodos, setPoromodos] = useState<any>([]);

  const fetchChangedHistory = (id: number) => {
    return getV1({
      url: `/strategy/get-changed-history?id=${id}`,
      onError,
      onSuccess: (result: any) => {
        if (result?.data?.changedHistory) {
          setChangedHistory(result?.data?.changedHistory);
          onSuccess?.(result?.data?.changedHistory);
        }
      },
    });
  };

  const fetchPoromodo = (id: number) => {
    return getV1({
      url: `/poromodo/get-by-strategy?id=${id}`,
      onError,
      onSuccess: (result: any) => {
        if (result?.data?.poromodos) {
          setPoromodos(result?.data?.poromodos);
          onSuccess?.(result?.data?.poromodos);
        }
      },
    });
  };

  const detailsChanged = useMemo(
    () => sortByArrayCreatedAt([...changedHistory, ...poromodos]),
    [changedHistory, poromodos]
  );

  const fetch = async (id: number) => {
    await fetchChangedHistory(id);
    await fetchPoromodo(id);
  };

  return { isLoading, fetch, detailsChanged };
};

export default useGetDetailsChangedStrategy;
