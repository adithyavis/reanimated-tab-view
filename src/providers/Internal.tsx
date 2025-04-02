import React, { createContext, useContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { CarouselImperativeHandle } from '../components/TabViewCarousel';
import type { Layout, Route } from '../types/common';
import { noop } from '../constants/common';

type InternalContext = {
  tabViewCarouselRef: React.RefObject<CarouselImperativeHandle>;
  animatedRouteIndex: SharedValue<number>;
  initialRouteIndex: number;
  currentRouteIndex: number;
  setCurrentRouteIndex: (index: number) => void;
  routes: Route[];
  noOfRoutes: number;
  tabViewLayout: Layout;
  tabViewHeaderLayout: Layout;
  tabBarLayout: Layout;
  tabViewCarouselLayout: Layout;
  jumpTo: (routeKey: string) => void;
  setTabViewLayout: React.Dispatch<React.SetStateAction<Layout>>;
  setTabViewHeaderLayout: React.Dispatch<React.SetStateAction<Layout>>;
  setTabBarLayout: React.Dispatch<React.SetStateAction<Layout>>;
  setTabViewCarouselLayout: React.Dispatch<React.SetStateAction<Layout>>;
};

const InternalContext = createContext<InternalContext>({
  tabViewCarouselRef: { current: null },
  animatedRouteIndex: { value: 0 },
  initialRouteIndex: 0,
  currentRouteIndex: 0,
  routes: [],
  noOfRoutes: 0,
  tabViewLayout: { width: 0, height: 0 },
  tabViewHeaderLayout: { width: 0, height: 0 },
  tabBarLayout: { width: 0, height: 0 },
  tabViewCarouselLayout: { width: 0, height: 0 },
  setCurrentRouteIndex: noop,
  jumpTo: noop,
  setTabViewLayout: noop,
  setTabViewHeaderLayout: noop,
  setTabBarLayout: noop,
  setTabViewCarouselLayout: noop,
});

type InternalContextProviderProps = {
  value: InternalContext;
};

export const InternalContextProvider = React.memo<
  React.PropsWithChildren<InternalContextProviderProps>
>(function InternalContextProvider({ children, value }) {
  return (
    <InternalContext.Provider value={value}>
      {children}
    </InternalContext.Provider>
  );
});

export const useInternalContext = () => useContext(InternalContext);
