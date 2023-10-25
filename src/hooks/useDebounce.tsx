import { useRef } from "react";

export const useDebounce = <TFuncParam,>(
  func: (param: TFuncParam) => void,
  milliSeconds: number,
) => {
  const timeoutId = useRef<number | null>(null);

  return function (param: TFuncParam) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      timeoutId.current = null;
      func(param);
    }, milliSeconds);
  };
};
