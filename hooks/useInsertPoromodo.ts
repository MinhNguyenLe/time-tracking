import useLoading from "./useLoading";

const useInsertPoromodo = ({ onError, onSuccess }: any) => {
  const { isLoading, post: postV1 } = useLoading();

  const fetch = (bodyParams: any) => {
    return postV1({ url: "/poromodo/insert", bodyParams, onError, onSuccess });
  };

  return { isLoading, fetch };
};

export default useInsertPoromodo;
