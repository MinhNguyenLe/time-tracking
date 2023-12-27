import { useEffect, useState } from "react";

const DEFAULT_POROMODO_TIME = 25 * 60 * 60;
interface UseCountdownByTime {
  byTime: number;
}
type StatusTimer = "INACTIVE" | "ACTIVE" | "DONE" | "PAUSE";

const useCountdownByTime = (
  { byTime }: UseCountdownByTime = { byTime: DEFAULT_POROMODO_TIME }
) => {
  const [countdown, setCountDown] = useState(byTime);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<StatusTimer>("INACTIVE");

  const isActive = () => status === "ACTIVE";
  const isPause = () => status === "PAUSE";
  const isDone = () => status === "DONE";
  const isInActive = () => status === "INACTIVE";

  // start -> stop -> start -> complete -> reset -> start

  const start = () => {
    setStatus("ACTIVE");
    setIsRunning(true);
  };
  const stop = () => {
    setStatus("PAUSE");
    setIsRunning(false);
  };
  const reset = (newTimer?: number) => {
    setStatus("INACTIVE");
    setIsRunning(false);
    setCountDown(newTimer || byTime);
  };
  const complete = () => {
    // More logic report at here
    setIsRunning(false);
    setStatus("DONE");
    setCountDown(0);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer: number = countdown;
      const interval = setInterval(() => {
        if (timer - 1 <= 0) {
          complete();
        } else {
          timer -= 1;
          setCountDown((countdown) => countdown - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const getReturnValues = (countDown: number) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  return {
    countdown,
    isActive,
    isPause,
    isInActive,
    isDone,
    start,
    stop,
    reset,
    getReturnValues,
  };
};

export default useCountdownByTime;
