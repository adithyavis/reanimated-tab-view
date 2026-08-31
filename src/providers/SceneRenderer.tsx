import React, { createContext, useContext, useMemo } from 'react';
import {
  useDerivedValue,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { useInternalContext } from '../providers/Internal';
import { noopSharedValue } from '../constants/common';

type SceneRendererContext = {
  isRouteFocusedSV: SharedValue<boolean>;
  scrollYSV: SharedValue<number>;
};

const SceneRendererContext = createContext<SceneRendererContext>({
  isRouteFocusedSV: noopSharedValue(false),
  scrollYSV: noopSharedValue(0),
});

type SceneRendererContextProviderProps = {
  index: number;
  children: React.ReactNode;
};

export const SceneRendererContextProvider =
  React.memo<SceneRendererContextProviderProps>(
    function SceneRendererContextProvider({ index, children }) {
      const { animatedRouteIndex } = useInternalContext();

      const isRouteFocusedSV = useDerivedValue(() => {
        return animatedRouteIndex.value === index;
      }, [index]);

      const scrollYSV = useSharedValue(0);

      const value = useMemo(
        () => ({
          isRouteFocusedSV,
          scrollYSV,
        }),
        [isRouteFocusedSV, scrollYSV]
      );

      return (
        <SceneRendererContext.Provider value={value}>
          {children}
        </SceneRendererContext.Provider>
      );
    }
  );

export const useSceneRendererContext = () => useContext(SceneRendererContext);
