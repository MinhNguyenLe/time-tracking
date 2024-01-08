import useLoading from "./useLoading";

const useStartStrategy = ({ onError, onSuccess, refetch }: any) => {
  const { isLoading, post: postV1 } = useLoading();
  const startStrategy = async (bodyParams: any) => {
    await postV1({
      url: "/strategy/change-status",
      bodyParams: { id: Number(bodyParams.id), status: "IN_PROCESS" },
      onError,
      onSuccess,
    });

    return refetch();
  };

  return { isLoading: isLoading, fetch: startStrategy };
};

export const useDelaysStrategy = ({ onError, onSuccess, refetch }: any) => {
  const { isLoading, post: postV1 } = useLoading();
  const startStrategy = async (bodyParams: any) => {
    await postV1({
      url: "/strategy/change-status",
      bodyParams: { id: Number(bodyParams.id), status: "DELAY" },
      onError,
      onSuccess,
    });

    return refetch();
  };

  return { isLoading: isLoading, fetch: startStrategy };
};

export default useStartStrategy;
