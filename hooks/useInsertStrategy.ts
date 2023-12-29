import useLoading from "./useLoading";

const useInsertStrategy = ({ onError, onSuccess }: any) => {
  const { isLoading, post: postV1 } = useLoading();

  const fetch = (bodyParams: any) => {
    return postV1({ url: "/strategy/insert", bodyParams, onError, onSuccess });
  };

  return { isLoading, fetch };
};

export default useInsertStrategy;
