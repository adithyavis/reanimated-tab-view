import React, { createContext, useContext } from 'react';
import type {
  RenderMode,
  TabBarType,
  TabBarPosition,
  KeyboardDismissMode,
  JumpMode,
} from '../types/TabView';
import type {
  NavigationState,
  Route,
  SceneRendererProps,
} from '../types/common';
import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import { noop } from '../constants/common';
import type { TabBarProps } from '../types';
import { SCROLLABLE_TAB_WIDTH } from '../constants/tabBar';
import type { SharedValue } from 'react-native-reanimated';

type PropsContext = {
  navigationState: NavigationState;
  renderMode: RenderMode;
  tabBarType: TabBarType;
  tabBarPosition: TabBarPosition;
  tabBarScrollEnabled: boolean;
  tabBarDynamicWidthEnabled: boolean;
  tabBarStyle: StyleProp<ViewStyle>;
  tabStyle: StyleProp<ViewStyle>;
  scrollableTabWidth: number;
  swipeEnabled: boolean;
  jumpMode: JumpMode;
  sceneContainerGap: number;
  sceneContainerStyle: StyleProp<ViewStyle>;
  keyboardDismissMode?: KeyboardDismissMode;
  providedAnimatedRouteIndexSV?: SharedValue<number>;
  renderTabBar?: (props: TabBarProps) => React.ReactNode;
  renderScene: (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => React.ReactNode;
  onIndexChange?: (index: number) => void;
  onSwipeEnd?: () => void;
  onSwipeStart?: () => void;
};

const PropsContext = createContext<PropsContext>({
  navigationState: {
    index: 0,
    routes: [],
  },
  renderMode: 'all',
  tabBarType: 'primary',
  tabBarPosition: 'top',
  tabBarScrollEnabled: false,
  tabBarDynamicWidthEnabled: false,
  scrollableTabWidth: SCROLLABLE_TAB_WIDTH,
  tabBarStyle: undefined,
  tabStyle: undefined,
  swipeEnabled: true,
  jumpMode: 'smooth',
  sceneContainerGap: 0,
  sceneContainerStyle: undefined,
  keyboardDismissMode: undefined,
  renderTabBar: undefined,
  providedAnimatedRouteIndexSV: undefined,
  renderScene: noop,
  onSwipeEnd: undefined,
  onSwipeStart: undefined,
  onIndexChange: undefined,
});

type PropsContextProviderProps = {
  value: PropsContext;
};

export const PropsContextProvider = React.memo<
  React.PropsWithChildren<PropsContextProviderProps>
>(function PropsContextProvider({ children, value }) {
  return (
    <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
  );
});

export const usePropsContext = () => useContext(PropsContext);
