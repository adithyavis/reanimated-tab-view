import React, { createContext, useContext, useMemo } from 'react';
import {
  useDerivedValue,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { useInternalContext } from '../providers/Internal';

type SceneRendererContext = {
  isRouteFocusedSV: SharedValue<boolean>;
  scrollYSV: SharedValue<number>;
};

const SceneRendererContext = createContext<SceneRendererContext>({
  isRouteFocusedSV: { value: false } as SharedValue<boolean>,
  scrollYSV: { value: 0 } as SharedValue<number>,
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
