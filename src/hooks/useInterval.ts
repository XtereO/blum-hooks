import { useEffect } from "react";
import { usePrevious } from "./usePrevious";

export const useInterval = (
  callback: () => void,
  delay: number | null,
  deps: unknown[]
) => {
  const savedCallback = usePrevious(callback, deps);

  useEffect(() => {
    if (!!delay && savedCallback) {
      const id = setInterval(savedCallback.current, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay, savedCallback, ...deps]);
};
