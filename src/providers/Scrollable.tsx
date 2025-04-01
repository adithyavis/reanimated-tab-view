import React, { createContext, useContext, useMemo } from 'react';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';
import { useInternalContext } from '../providers/Internal';
import { GestureSource } from '../constants/scrollable';

type ScrollableContext = {
  animatedTranslateYSV: SharedValue<number>;
  gestureSourceSV: SharedValue<GestureSource>;
  translateYBounds: { lower: number; upper: number };
};

const ScrollableContext = createContext<ScrollableContext>({
  animatedTranslateYSV: { value: 0 },
  gestureSourceSV: { value: GestureSource.SCROLL },
  translateYBounds: { lower: 0, upper: 0 },
});

type ScrollableContextProviderProps = {
  children: React.ReactNode;
};

export const ScrollableContextProvider =
  React.memo<ScrollableContextProviderProps>(
    function ScrollableContextProvider({ children }) {
      const animatedTranslateYSV = useSharedValue(0);

      const gestureSourceSV = useSharedValue<GestureSource>(
        GestureSource.SCROLL
      );

      const { tabViewHeaderLayout } = useInternalContext();

      const translateYBounds = useMemo(() => {
        return {
          lower: 0,
          upper: tabViewHeaderLayout.height,
        };
      }, [tabViewHeaderLayout.height]);

      const value = useMemo(
        () => ({
          animatedTranslateYSV,
          translateYBounds,
          gestureSourceSV,
        }),
        [animatedTranslateYSV, translateYBounds, gestureSourceSV]
      );

      return (
        <ScrollableContext.Provider value={value}>
          {children}
        </ScrollableContext.Provider>
      );
    }
  );

export const useScrollableContext = () => useContext(ScrollableContext);
