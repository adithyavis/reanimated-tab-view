import React, { createContext, useContext, useState } from 'react';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';
import type {
  RouteIndexToTabContentWidthMap,
  RouteIndexToTabOffsetMap,
  RouteIndexToTabWidthMap,
} from '../types/TabBar';
import { noop } from '../constants/common';

type TabLayoutContext = {
  routeIndexToTabContentWidthMap: RouteIndexToTabContentWidthMap;
  setRouteIndexToTabContentWidthMap: React.Dispatch<
    React.SetStateAction<RouteIndexToTabContentWidthMap>
  >;
  routeIndexToTabWidthMapSV: SharedValue<RouteIndexToTabWidthMap>;
  routeIndexToTabOffsetMapSV: SharedValue<RouteIndexToTabOffsetMap>;
  routeIndexToTabContentWidthMapSV: SharedValue<RouteIndexToTabContentWidthMap>;
};

const TabLayoutContext = createContext<TabLayoutContext>({
  routeIndexToTabContentWidthMap: {},
  setRouteIndexToTabContentWidthMap: noop,
  routeIndexToTabWidthMapSV: { value: {} },
  routeIndexToTabOffsetMapSV: { value: {} },
  routeIndexToTabContentWidthMapSV: { value: {} },
});

export const TabLayoutContextProvider: React.FC = React.memo(
  function TabLayoutContextProvider({ children }) {
    const [routeIndexToTabContentWidthMap, setRouteIndexToTabContentWidthMap] =
      useState({});
    const routeIndexToTabWidthMapSV = useSharedValue({});
    const routeIndexToTabOffsetMapSV = useSharedValue({});
    const routeIndexToTabContentWidthMapSV = useSharedValue({});

    return (
      <TabLayoutContext.Provider
        value={{
          routeIndexToTabContentWidthMap,
          setRouteIndexToTabContentWidthMap,
          routeIndexToTabWidthMapSV,
          routeIndexToTabOffsetMapSV,
          routeIndexToTabContentWidthMapSV,
        }}
      >
        {children}
      </TabLayoutContext.Provider>
    );
  }
);

export const useTabLayoutContext = () => useContext(TabLayoutContext);
