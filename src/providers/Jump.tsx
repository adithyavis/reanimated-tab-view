import React, { createContext, useContext, useMemo, useState } from 'react';
import { useInternalContext } from './Internal';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';
import { noop } from '../constants/common';

type JumpContext = {
  isJumping: boolean;
  setIsJumping: (val: boolean) => void;
  jumpEndRouteIndexSV: SharedValue<number | null>;
  smoothJumpStartRouteIndex: number;
  setSmoothJumpStartRouteIndex: (index: number) => void;
  smoothJumpStartRouteIndexSV: SharedValue<number>;
  smoothJumpStartRouteTranslationXSV: SharedValue<number>;
};

const JumpContext = createContext<JumpContext>({
  isJumping: false,
  setIsJumping: noop,
  jumpEndRouteIndexSV: { value: null },
  smoothJumpStartRouteIndex: 0,
  setSmoothJumpStartRouteIndex: noop,
  smoothJumpStartRouteIndexSV: { value: 0 },
  smoothJumpStartRouteTranslationXSV: { value: 0 },
});

export const JumpContextProvider = React.memo(function JumpContextProvider({
  children,
}) {
  //#region variables
  const { initialRouteIndex } = useInternalContext();

  const jumpEndRouteIndexSV = useSharedValue<number | null>(null);

  const [isJumping, setIsJumping] = useState(false);

  const [smoothJumpStartRouteIndex, setSmoothJumpStartRouteIndex] =
    useState(initialRouteIndex);
  const smoothJumpStartRouteIndexSV = useSharedValue(initialRouteIndex);

  const smoothJumpStartRouteTranslationXSV = useSharedValue(0);
  //#endregion

  const value = useMemo(
    () => ({
      isJumping,
      setIsJumping,
      smoothJumpStartRouteIndex,
      setSmoothJumpStartRouteIndex,
      smoothJumpStartRouteIndexSV,
      smoothJumpStartRouteTranslationXSV,
      jumpEndRouteIndexSV,
    }),
    [
      isJumping,
      smoothJumpStartRouteIndex,
      smoothJumpStartRouteIndexSV,
      smoothJumpStartRouteTranslationXSV,
      jumpEndRouteIndexSV,
    ]
  );

  return <JumpContext.Provider value={value}>{children}</JumpContext.Provider>;
});

export const useJumpContext = () => useContext(JumpContext);
