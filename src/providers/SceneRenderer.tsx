import React, { createContext, useContext, useMemo } from 'react';
import { useInternalContext } from '../providers/Internal';
import type { Route } from '../types';

type SceneRendererContext = {
  route: Route;
  isRouteFocused: boolean;
};

const SceneRendererContext = createContext<SceneRendererContext>({
  route: { key: '', title: '' },
  isRouteFocused: false,
});

type SceneRendererContextProviderProps = {
  route: Route;
  index: number;
  children: React.ReactNode;
};

export const SceneRendererContextProvider =
  React.memo<SceneRendererContextProviderProps>(
    function SceneRendererContextProvider({ route, index, children }) {
      const { currentRouteIndex } = useInternalContext();

      const isRouteFocused = useMemo(() => {
        return index === currentRouteIndex;
      }, [index, currentRouteIndex]);

      const value = useMemo(
        () => ({
          route,
          isRouteFocused,
        }),
        [route, isRouteFocused]
      );

      return (
        <SceneRendererContext.Provider value={value}>
          {children}
        </SceneRendererContext.Provider>
      );
    }
  );

export const useSceneRendererContext = () => useContext(SceneRendererContext);
