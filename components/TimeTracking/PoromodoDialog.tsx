import { STRATEGY_LABEL } from "@/constants";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  duration: number;
  strategyName: string;
  satisfaction: number;
  productivity: number;
  interested: number;
  insight: number;
}

const PoromodoDialog = ({ open, onClose }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      strategyName: "",
      duration: 0,
      satisfaction: 0,
      productivity: 0,
      interested: 0,
      insight: 0,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const onCloseAndReset = () => {
    onClose();
    reset();
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
                  Poromodo information
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Choose strategy
                        </label>
                        <select
                          className="relative z-2 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("strategyName", { required: true })}
                        >
                          {Object.values(STRATEGY_LABEL).map((label) => (
                            <option value={label} key={label}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your time, by hours"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("duration", { required: true })}
                        />
                        {errors.duration && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Satisfaction
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your time, by hours"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("satisfaction", { required: true })}
                        />
                        {errors.satisfaction && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Productivity
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your time, by hours"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("productivity", { required: true })}
                        />
                        {errors.productivity && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Interested
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your time, by hours"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("interested", { required: true })}
                        />
                        {errors.interested && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Insight
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your time, by hours"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          {...register("insight", { required: true })}
                        />
                        {errors.insight && (
                          <span className="text-sm text-[#cc0000]">
                            This field is required
                          </span>
                        )}
                      </div>
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

export default PoromodoDialog;
