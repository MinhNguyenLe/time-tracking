import { STRATEGY_STATUS } from "@/constants";

const StrategyStatus = ({ status }: { status: string }) => {
  if (status === STRATEGY_STATUS.NOT_STARTED) {
    return (
      <span className="mt-1 mr-2 flex h-6 w-full max-w-6 items-center justify-center rounded-full border border-[#d1e0e0]">
        <span className="block h-3 w-full max-w-3 rounded-full bg-[#d1e0e0]"></span>
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

export default StrategyStatus;
