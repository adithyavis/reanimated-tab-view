import { useEffect, useRef } from 'react';

export const useStateUpdatesListener = (
  state: any,
  callback: () => void,
  listenToInitialStateUpdate = false
) => {
  const prevStateRef = useRef(listenToInitialStateUpdate ? null : state);

  useEffect(() => {
    if (state !== prevStateRef.current) {
      callback();
      prevStateRef.current = state;
    }
  }, [callback, state]);
};
