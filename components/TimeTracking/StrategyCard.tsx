const StrategyCard = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark divide-y divide-blue-200">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <p className="font-semibold text-primary">Strategy name - 110h30m</p>
          <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
          <p className="text-sm font-medium">I want to learn English, lol</p>
        </div>
        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#ffcc00]">
          <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#ffcc00]"></span>
        </span>
      </div>
      <div className="mt-4 pt-4">
        <div className="pb-4">
          <p className="text-sm font-medium">
            First, learn listening from film or music
          </p>
          <p className="text-sm font-medium">
            First, learn listening from film or music
          </p>
          <p className="text-sm font-medium">
            First, learn listening from film or music
          </p>
        </div>
        <div className="flex justify-between">
          <span className={`text-sm font-medium text-[#009999]`}>13.31</span>
          <span className={`text-sm font-medium text-[#ff9900]`}>13.32</span>
          <span className={`text-sm font-medium text-[#ff00ff]`}>13.33</span>
          <span className={`text-sm font-medium text-[#cc0000]`}>13.34</span>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
