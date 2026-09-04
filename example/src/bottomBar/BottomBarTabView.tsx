import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  TabView,
  type NavigationState,
  type Route,
  type SceneRendererProps,
  type TabBarConfig,
  type TabViewMethods,
} from 'reanimated-tab-view';
import { FloatingTabBar } from './FloatingTabBar';
import { TodayScene } from './TodayScene';
import { ListScene } from './ListScene';
import { ArcadeScene } from './ArcadeScene';
import { SearchScene } from './SearchScene';
import { appsSections, gamesSections } from './storeData';
import { colors, metrics } from './theme';

const ROUTES: Route[] = [
  { key: 'today', title: 'Today' },
  { key: 'games', title: 'Games' },
  { key: 'apps', title: 'Apps' },
  { key: 'arcade', title: 'Arcade' },
  { key: 'search', title: 'Search' },
];

export const BottomBarTabView = () => {
  const { width: windowWidth } = useWindowDimensions();

  const tabViewRef = useRef<TabViewMethods>(null);

  const [selection, setSelection] = useState({ index: 2, previousIndex: 0 });

  const navigationState = useMemo<NavigationState>(
    () => ({ index: selection.index, routes: ROUTES }),
    [selection.index]
  );

  const animatedRouteIndex = useSharedValue(selection.index);

  const handleIndexChange = useCallback((index: number) => {
    setSelection((state) => ({ index, previousIndex: state.index }));
  }, []);

  const handleSwipeStart = useCallback(() => {
    setSelection((state) => ({ ...state, previousIndex: state.index }));
  }, []);

  const handleTabPress = useCallback((route: Route) => {
    tabViewRef.current?.jumpTo(route.key);
  }, []);

  const renderScene = useCallback(({ route }: SceneRendererProps) => {
    switch (route.key) {
      case 'games':
        return <ListScene title="Games" sections={gamesSections} />;
      case 'apps':
        return <ListScene title="Apps" sections={appsSections} />;
      case 'arcade':
        return <ArcadeScene />;
      case 'search':
        return <SearchScene />;
      default:
        return <TodayScene />;
    }
  }, []);

  const renderTabBar = useCallback(
    () => (
      <FloatingTabBar
        routes={ROUTES}
        selectedIndex={selection.index}
        previousIndex={selection.previousIndex}
        animatedRouteIndex={animatedRouteIndex}
        onTabPress={handleTabPress}
      />
    ),
    [
      animatedRouteIndex,
      handleTabPress,
      selection.index,
      selection.previousIndex,
    ]
  );

  const tabBarConfig: TabBarConfig = useMemo(
    () => ({
      tabBarPosition: 'bottom',
      renderTabBar,
    }),
    [renderTabBar]
  );

  const initialLayout = useMemo(
    () => ({
      tabView: { width: windowWidth },
      tabBar: { height: metrics.tabBarHeight },
    }),
    [windowWidth]
  );

  return (
    <TabView
      ref={tabViewRef}
      navigationState={navigationState}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      animatedRouteIndex={animatedRouteIndex}
      onSwipeStart={handleSwipeStart}
      tabBarConfig={tabBarConfig}
      initialLayout={initialLayout}
      renderMode="lazy"
      style={styles.tabView}
    />
  );
};

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: colors.background,
  },
});
