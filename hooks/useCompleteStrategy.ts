import useLoading from "./useLoading";

const useCompleteStrategy = ({ onError, onSuccess, refetch }: any) => {
  const { isLoading, post: postV1 } = useLoading();
  const startStrategy = async (bodyParams: any) => {
    await postV1({
      url: "/strategy/complete",
      bodyParams: { id: Number(bodyParams.id) },
      onError,
      onSuccess,
    });

    return refetch();
  };

  return { isLoading: isLoading, fetch: startStrategy };
};

export default useCompleteStrategy;
