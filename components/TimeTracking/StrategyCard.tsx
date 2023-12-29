import StrategyStatus from "./StrategyStatus";

const StrategyCard = ({ strategy }: any) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark divide-y divide-blue-200">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <p className="font-semibold text-primary">
            {strategy.Name} -{" "}
            {strategy.Process.Int64 || 0 + "h/" + strategy.TimeEstimate + "h"}
          </p>
          <p className="text-sm font-medium">{strategy.StartedAt} - {strategy.EndedAt}</p>
          <p className="text-sm font-medium">{strategy.Goal}</p>
        </div>
        <StrategyStatus status={strategy.Status}/>
      </div>
      <div className="mt-4 pt-4">
        <div className="pb-4">
          <p className="whitespace-pre-line	 text-sm font-medium">
            {strategy.Details}
          </p>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm font-medium text-[#009999]`}>{strategy.Satisfaction}</span>
          <span className={`text-sm font-medium text-[#ff9900]`}>{strategy.Productivity}</span>
          <span className={`text-sm font-medium text-[#ff00ff]`}>{strategy.Interested}</span>
          <span className={`text-sm font-medium text-[#cc0000]`}>{strategy.Insight}</span>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
