import { STRATEGY_LABEL } from "@/constants";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import useInsertStrategy from "@/hooks/useInsertStrategy";

interface Inputs {
  name: string;
  timeEstimate: number;
  start: Date;
  end: Date;
  label: string;
  goal: string;
  details: string;
}

const StrategyDialog = ({ open, onClose, refetch }: any) => {
  const { isLoading, fetch: insertStrategy } = useInsertStrategy({
    onSuccess: (result: any) => {
      console.log(result);
      onCloseAndReset();
    },
    onError: (error: any) => {
      console.log(error);
      onCloseAndReset();
    },
  });

  const handleValueChange = (newValue: any) => {
    setValue("start", dayjs(newValue.startDate).toDate());
    setValue("end", dayjs(newValue.endDate).endOf("day").toDate());
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      start: new Date(),
      end: new Date(),
      name: "",
      timeEstimate: 0,
      label: STRATEGY_LABEL.LEARN_TECHNICAL,
      goal: "",
      details: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({
      ...data,
      unitTime: "hour",
      timeEstimate: Number(data.timeEstimate),
      createdAt: new Date(),
      status: "NOT_STARTED",
    });

    await insertStrategy({
      ...data,
      unitTime: "hour",
      timeEstimate: Number(data.timeEstimate),
      createdAt: new Date(),
      status: "NOT_STARTED",
    });
  };
  const watchStart = watch("start");
  const watchEnd = watch("end");

  const onCloseAndReset = () => {
    onClose();
    reset();

    refetch();
  };

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
                  Strategy information {isLoading.toString()}
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Name strategy
                        </label>
                        <input
                          type="text"
                          placeholder="Enter a short name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Estimate time
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your time, by hours"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("timeEstimate", { required: true })}
                        />
                        {errors.timeEstimate && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Start - End <span className="text-meta-1">*</span>
                      </label>
                      <Datepicker
                        value={{ startDate: watchStart, endDate: watchEnd }}
                        onChange={handleValueChange}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Goal <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your goal"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...register("goal", { required: true })}
                      />
                      {errors.goal && (
                        <span className="text-sm text-[#cc0000]">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Label <span className="text-meta-1">*</span>
                      </label>
                      <div className="relative z-2 bg-transparent dark:bg-form-input">
                        <select
                          className="relative z-2 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("label", { required: true })}
                        >
                          {Object.values(STRATEGY_LABEL).map((label) => (
                            <option value={label} key={label}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <span className="absolute top-1/2 right-4 z-3 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Details strategy <span className="text-meta-1">*</span>
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Type more details"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...register("details", { required: true })}
                      ></textarea>
                      {errors.details && (
                        <span className="text-sm text-[#cc0000]">
                          This field is required
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center rounded bg-primary p-3 font-medium text-gray"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StrategyDialog;
