"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DetailsChangedStrategy from "@/components/TimeTracking/DetailsChangedStrategy";
import PoromodoDialog from "@/components/TimeTracking/PoromodoDialog";
import PoromodoTable from "@/components/TimeTracking/PoromodoTable";
import StrategyCard from "@/components/TimeTracking/StrategyCard";
import StrategyDialog from "@/components/TimeTracking/StrategyDialog";
import useDialog from "@/hooks/useDialog";
import useGetListStrategies from "@/hooks/useGetListStrategies";
import useGetPoromodos from "@/hooks/useGetPoromodos";
import { useState, useEffect } from "react";

/**
 * satisfaction: "#009999",
  productivity: "#ff9900",
  interested: "#ff00ff",
  insight: "#cc0000",
  notStarted: "#d1e0e0",
  inProcess: "#ffcc00",
  completed: "#00cc99",
};
 */

const TimeTracking = () => {
  const {
    strategies,
    isLoading: isGettingStrategy,
    fetch: fetchStrategies,
  } = useGetListStrategies({
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
  });
  const {
    isLoading: isGettingPoromodo,
    fetch: fetchPoromodo,
    poromodos,
  } = useGetPoromodos({
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
  });

  const { open, onOpen, onClose } = useDialog();
  const {
    open: openPoromodo,
    onOpen: onOpenPoromodo,
    onClose: onClosePoromodo,
  } = useDialog();
  const {
    open: openDetailsChanged,
    onOpen: onOpenDetailsChanged,
    onClose: onCloseDetailChaned,
  } = useDialog();

  useEffect(() => {
    fetchStrategies();
    fetchPoromodo();
  }, []);

  const [strategyTarget, setStrategyTarget] = useState<string>("");

  return (
    <>
      <StrategyDialog refetch={fetchStrategies} open={open} onClose={onClose} />
      <PoromodoDialog
        refetch={() => {
          fetchPoromodo();
          fetchStrategies();
        }}
        open={openPoromodo}
        onClose={onClosePoromodo}
      />
      <DetailsChangedStrategy
        id={strategyTarget}
        open={openDetailsChanged}
        onClose={onCloseDetailChaned}
      />

      <Breadcrumb pageName="Time Tracking" />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-6">
          <div className="mb-8">
            <button
              onClick={() => {
                onOpen();
              }}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Insert strategy
            </button>
          </div>

          {/* <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <CardDataStats
              title="Total views"
              total="$3.456K"
              rate="0.43%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats
              title="Total Profit"
              total="$45,2K"
              rate="4.35%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
                  fill=""
                />
                <path
                  d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
                  fill=""
                />
                <path
                  d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
          </div> */}

          <div className="mb-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#009999]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Satisfaction
                  </p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ff9900]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Productivity
                  </p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ff00ff]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Interested
                  </p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#cc0000]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Insight
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#259ae6]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Not started
                  </p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ffcc00]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    In process
                  </p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[#00cc99]`}
                  ></span>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            {isGettingStrategy
              ? "Loading ..."
              : strategies?.map((strategy: any) => (
                  <StrategyCard
                    onClick={() => {
                      setStrategyTarget(()=> strategy.Id);
                      onOpenDetailsChanged();
                    }}
                    refetchStrategies={fetchStrategies}
                    key={strategy.Id}
                    strategy={strategy}
                  />
                ))}
          </div>
        </div>

        <div className="col-span-6">
          <div className="mb-8">
            <button
              onClick={() => {
                onOpenPoromodo();
              }}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Insert poromodo
            </button>
          </div>
          <PoromodoTable isLoading={isGettingPoromodo} poromodos={poromodos} />
        </div>
      </div>
    </>
  );
};

export default TimeTracking;
