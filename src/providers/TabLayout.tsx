import React, { createContext, useContext, useMemo, useState } from 'react';
import { makeMutable, useSharedValue, type SharedValue } from 'react-native-reanimated';
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
  routeIndexToTabWidthMapSV: makeMutable({}),
  routeIndexToTabOffsetMapSV: makeMutable({}),
  routeIndexToTabContentWidthMapSV: makeMutable({}),
});

export const TabLayoutContextProvider: React.FC<{ children: React.ReactNode }> = React.memo(
  function TabLayoutContextProvider({ children }) {
    const [routeIndexToTabContentWidthMap, setRouteIndexToTabContentWidthMap] =
      useState({});
    const routeIndexToTabWidthMapSV = useSharedValue({});
    const routeIndexToTabOffsetMapSV = useSharedValue({});
    const routeIndexToTabContentWidthMapSV = useSharedValue({});

    const value = useMemo(
      () => ({
        routeIndexToTabContentWidthMap,
        setRouteIndexToTabContentWidthMap,
        routeIndexToTabWidthMapSV,
        routeIndexToTabOffsetMapSV,
        routeIndexToTabContentWidthMapSV,
      }),
      [
        routeIndexToTabContentWidthMap,
        setRouteIndexToTabContentWidthMap,
        routeIndexToTabWidthMapSV,
        routeIndexToTabOffsetMapSV,
        routeIndexToTabContentWidthMapSV,
      ]
    );

    return (
      <TabLayoutContext.Provider value={value}>
        {children}
      </TabLayoutContext.Provider>
    );
  }
);

export const useTabLayoutContext = () => useContext(TabLayoutContext);
