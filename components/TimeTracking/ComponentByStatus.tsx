import { STRATEGY_STATUS } from "@/constants";
import useCompleteStrategy from "@/hooks/useCompleteStrategy";
import useStartStrategy, { useDelaysStrategy } from "@/hooks/useStartStrategy";
import { PropsWithChildren } from "react";

export const StrategyStatus = ({ status }: { status: string }) => {
  if (status === STRATEGY_STATUS.NOT_STARTED) {
    return (
      <span className="mt-1 mr-2 flex h-6 w-full max-w-6 items-center justify-center rounded-full border border-[#d1e0e0]">
        <span className="block h-3 w-full max-w-3 rounded-full bg-[#259ae6]"></span>
      </span>
    );
  }

  if (status === STRATEGY_STATUS.IN_PROCESS) {
    return (
      <span className="mt-1 mr-2 flex h-6 w-full max-w-6 items-center justify-center rounded-full border border-[#ffcc00]">
        <span className="block h-3 w-full max-w-3 rounded-full bg-[#ffcc00]"></span>
      </span>
    );
  }

  if (status === STRATEGY_STATUS.COMPLETED) {
    return (
      <span className="mt-1 mr-2 flex h-6 w-full max-w-6 items-center justify-center rounded-full border border-[#00cc99]">
        <span className="block h-3 w-full max-w-3 rounded-full bg-[#00cc99]"></span>
      </span>
    );
  }

  return <></>;
};

export const StrategyTitle = ({ status, children }: any) => {
  if (status === STRATEGY_STATUS.NOT_STARTED) {
    return <p className="font-semibold text-[#259ae6]">{children}</p>;
  }

  if (status === STRATEGY_STATUS.IN_PROCESS) {
    return <p className="font-semibold text-[#ffcc00]">{children}</p>;
  }

  if (status === STRATEGY_STATUS.COMPLETED) {
    return <p className="font-semibold text-[#00cc99]">{children}</p>;
  }

  return <></>;
};

export const StrategyAction = ({
  status,
  id,
  refetchStrategies,
}: {
  id: string;
  status: keyof typeof STRATEGY_STATUS;
  refetchStrategies: any;
}) => {
  const { isLoading, fetch } = useStartStrategy({
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
    refetch: refetchStrategies,
  });

  const { isLoading:isCompleting, fetch:onComplete } = useCompleteStrategy({
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
    refetch: refetchStrategies,
  });

  const ButtonContainer = ({
    children,
    onClick,
  }: PropsWithChildren<
    Pick<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      "onClick"
    >
  >) => (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center gap-2.5 mx-1 py-1 px-2 text-center font-medium text-white rounded-md border-2 border-[#5e64db]"
    >
      <span>{children}</span>
    </button>
  );

  if (isLoading || isCompleting) {
    return (
      <ButtonContainer>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="blue"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V5"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M19.4246 18.9246L16.5961 16.0962"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M22.5 11.5L18.5 11.5"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M12 18V22"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M7.40381 6.90381L4.57538 4.07538"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M5.5 11.5L1.5 11.5"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M7.40381 16.0962L4.57538 18.9246"
            stroke="blue"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
      </ButtonContainer>
    );
  }

  if (
    status === STRATEGY_STATUS.NOT_STARTED ||
    status === STRATEGY_STATUS.DELAY
  ) {
    return (
      <ButtonContainer
        onClick={async () => {
          fetch({ id });
        }}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 32 32"
          id="i-forwards"
          xmlns="http://www.w3.org/2000/svg"
          fill="blue"
          stroke="currentcolor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M16 2 L30 16 16 30 16 16 2 30 2 2 16 16 Z" />
        </svg>
      </ButtonContainer>
    );
  }

  if (status === STRATEGY_STATUS.IN_PROCESS) {
    return (
      <>
        {/* <ButtonContainer>
          <svg
            width="20x"
            height="20px"
            viewBox="0 0 24 24"
            fill="blue"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12C6 12.5523 6.44772 13 7 13L17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H7C6.44772 11 6 11.4477 6 12Z"
              fill="blue"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
              fill="blue"
            />
          </svg>
        </ButtonContainer> */}
        <ButtonContainer onClick={()=>{onComplete({id})}}>
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            fill="blue"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3742 5.98559L10.3742 14.9856C9.72664 16.1511 7.97832 15.1798 8.62585 14.0143L13.6258 5.01431C14.2734 3.84876 16.0217 4.82005 15.3742 5.98559Z"
              fill="blue"
            />
            <path
              d="M5.1247 9.71907L10.1247 13.7191C11.1659 14.552 9.91646 16.1137 8.87531 15.2808L3.87531 11.2808C2.83415 10.4479 4.08354 8.88615 5.1247 9.71907Z"
              fill="blue"
            />
          </svg>
        </ButtonContainer>
      </>
    );
  }

  return <></>;
};
