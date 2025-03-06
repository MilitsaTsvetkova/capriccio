import { useEffect, useRef } from "react";
import { ImmerHook, useImmer } from "use-immer";

export const useSynchedState = <T>(
  initialState: T,
  syncCallback: (state: T) => void
): ImmerHook<T> => {
  const [state, setState] = useImmer<T>(initialState);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      syncCallback(state);
    }
    didMountRef.current = true;
  }, [state, setState]);

  return [state, setState];
};
