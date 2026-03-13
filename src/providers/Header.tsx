import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { makeMutable, useSharedValue, type SharedValue } from 'react-native-reanimated';
import { useInternalContext } from './Internal';
import { GestureSource } from '../constants/scrollable';

type HeaderContext = {
  animatedTranslateYSV: SharedValue<number>;
  gestureSourceSV: SharedValue<GestureSource>;
  translateYBoundsUpperSV: SharedValue<number>;
};

const HeaderContext = createContext<HeaderContext>({
  animatedTranslateYSV: makeMutable(0),
  gestureSourceSV: makeMutable<GestureSource>(GestureSource.SCROLL),
  translateYBoundsUpperSV: makeMutable(0),
});

type HeaderContextProviderProps = {
  children: React.ReactNode;
};

export const HeaderContextProvider = React.memo<HeaderContextProviderProps>(
  function HeaderContextProvider({ children }) {
    const animatedTranslateYSV = useSharedValue(0);

    const gestureSourceSV = useSharedValue<GestureSource>(GestureSource.SCROLL);

    const { tabViewHeaderLayout } = useInternalContext();

    const translateYBoundsUpperSV = useSharedValue(tabViewHeaderLayout.height);
    useEffect(() => {
      translateYBoundsUpperSV.value = tabViewHeaderLayout.height;
    }, [tabViewHeaderLayout.height, translateYBoundsUpperSV]);

    const value = useMemo(
      () => ({
        animatedTranslateYSV,
        translateYBoundsUpperSV,
        gestureSourceSV,
      }),
      [animatedTranslateYSV, translateYBoundsUpperSV, gestureSourceSV]
    );

    return (
      <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
    );
  }
);

export const useHeaderContext = () => useContext(HeaderContext);
