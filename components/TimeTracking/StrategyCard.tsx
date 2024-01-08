import { formatDate } from "@/modules/day";
import {
  StrategyStatus,
  StrategyTitle,
  StrategyAction,
} from "./ComponentByStatus";
import { formatHourMinute } from "@/utils/utils";

const StrategyCard = ({ onClick, strategy, refetchStrategies }: any) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark divide-y divide-blue-200"
    >
      <div className="flex items-start justify-between">
        <div className="w-full">
          <StrategyTitle status={strategy.Status}>
            {strategy.Name} - {formatHourMinute(strategy.Process)}
            {"/"}
            {formatHourMinute(strategy.TimeEstimate)}
          </StrategyTitle>
          <p className="text-sm font-medium">
            {formatDate(strategy.StartedAt)} - {formatDate(strategy.EndedAt)}
          </p>
          <p className="text-sm font-medium">{strategy.Goal}</p>
        </div>
        <StrategyStatus status={strategy.Status} />
      </div>
      <div className="mt-4 pt-4">
        <div className="pb-4">
          <p className="whitespace-pre-line	 text-sm font-medium">
            {strategy.Details}
          </p>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm font-medium text-[#009999]`}>
            {strategy.Satisfaction}
          </span>
          <span className={`text-sm font-medium text-[#ff9900]`}>
            {strategy.Productivity}
          </span>
          <span className={`text-sm font-medium text-[#ff00ff]`}>
            {strategy.Interested}
          </span>
          <span className={`text-sm font-medium text-[#cc0000]`}>
            {strategy.Insight}
          </span>
        </div>
        <div className="flex justify-end">
          <StrategyAction
            refetchStrategies={refetchStrategies}
            id={strategy.Id}
            status={strategy.Status}
          />
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
