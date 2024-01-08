import useGetDetailsChangedStrategy from "@/hooks/useGetDetailsChangedStrategy";
import { formatDate } from "@/modules/day";
import { formatHourMinute } from "@/utils/utils";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect } from "react";

const DetailsChangedStrategy = ({ id, open, onClose }: any) => {
  const { isLoading, fetch, detailsChanged } = useGetDetailsChangedStrategy({
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (result: any) => {
      console.log(result);
    },
  });

  const onCloseAndReset = () => {
    onClose();
  };

  useEffect(() => {
    if (open && id) {
      fetch(id);
    }
  }, [open]);

  const RenderByTypeOfChanged = ({ detailChanged }: any) => {
    if (detailChanged.Status) {
      return (
        <>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {formatDate(detailChanged.CreatedAt)}
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Change status
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {detailChanged.Status}
          </p>
        </>
      );
    }

    return (
      <>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {formatDate(detailChanged.CreatedAt)}
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add poromodo
        </h3>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Duration: {formatHourMinute(detailChanged?.Duration)}
        </p>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Satisfaction: {detailChanged?.Satisfaction}
        </p>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Productivity: {detailChanged?.Productivity}
        </p>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Interested: {detailChanged?.Interested}
        </p>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Insight: {detailChanged?.Insight}
        </p>
      </>
    );
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-1" onClose={onCloseAndReset}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-4xl w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Detals changed strategy
                </Dialog.Title>
                <div className="p-6.5">
                  <ol className="overflow-y-scroll max-h-600 border-s border-gray-200 dark:border-gray-700">
                    {detailsChanged?.length
                      ? detailsChanged.map((detailChanged: any) => (
                          <li
                            className="mb-4 ms-4"
                            key={new Date(detailChanged.CreatedAt).getTime()}
                          >
                            <RenderByTypeOfChanged
                              detailChanged={detailChanged}
                            />
                          </li>
                        ))
                      : null}
                  </ol>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailsChangedStrategy;
