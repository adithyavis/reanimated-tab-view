import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import {
  TabBar,
  TabView,
  type HeaderRendererProps,
  type NavigationState,
  type Route,
  type Scene,
  type SceneRendererProps,
  type TabBarConfig,
  type TabBarProps,
  type TabContentProps,
} from 'reanimated-tab-view';
import { HEADER_HEIGHT, InstagramHeader } from './InstagramHeader';
import { InstagramTabContent } from './InstagramTabContent';
import {
  InstagramMediaGrid,
  PHOTO_ASPECT_RATIO,
  REEL_ASPECT_RATIO,
} from './InstagramMediaGrid';
import { ReelsSortMenu, type ReelsSort } from './ReelsSortMenu';
import { posts, reels, reelsByViews, tagged } from './profile';
import { colors, metrics } from './theme';

const { width: windowWidth } = Dimensions.get('window');
const TAB_WIDTH = windowWidth / 3;

const ROUTES: Route[] = [{ key: 'posts' }, { key: 'reels' }, { key: 'tagged' }];

const INITIAL_LAYOUT = {
  tabView: { width: windowWidth },
  tabBar: { height: metrics.tabBarHeight },
  tabViewHeader: { height: HEADER_HEIGHT },
};

const CollapseSync = ({
  source,
  target,
}: {
  source: SharedValue<number>;
  target: SharedValue<number>;
}) => {
  useAnimatedReaction(
    () => source.value,
    (value) => {
      target.value = value;
    },
    [source, target]
  );
  return null;
};

export const InstagramTabView = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    index: 0,
    routes: ROUTES,
  });
  const [reelsSort, setReelsSort] = useState<ReelsSort>('latest');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const headerHeightSV = useSharedValue(HEADER_HEIGHT);
  const collapsedHeaderHeightSV = useSharedValue(0);

  const activeRouteKey = navigationState.routes[navigationState.index]?.key;

  const handleIndexChange = useCallback((index: number) => {
    setIsSortMenuOpen(false);
    setNavigationState((prev) => ({ ...prev, index }));
  }, []);

  const handleTabPress = useCallback(
    ({ route }: Scene) => {
      setIsSortMenuOpen(
        (isOpen) =>
          !isOpen && route.key === 'reels' && activeRouteKey === 'reels'
      );
    },
    [activeRouteKey]
  );

  const closeSortMenu = useCallback(() => setIsSortMenuOpen(false), []);

  const handleSortChange = useCallback((sort: ReelsSort) => {
    setReelsSort(sort);
    setIsSortMenuOpen(false);
  }, []);

  const handleHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      headerHeightSV.value = event.nativeEvent.layout.height;
    },
    [headerHeightSV]
  );

  const renderScene = useCallback(
    ({ route }: SceneRendererProps) => {
      switch (route.key) {
        case 'reels':
          return (
            <InstagramMediaGrid
              data={reelsSort === 'latest' ? reels : reelsByViews}
              aspectRatio={REEL_ASPECT_RATIO}
            />
          );
        case 'tagged':
          return (
            <InstagramMediaGrid
              data={tagged}
              aspectRatio={PHOTO_ASPECT_RATIO}
            />
          );
        default:
          return (
            <InstagramMediaGrid data={posts} aspectRatio={PHOTO_ASPECT_RATIO} />
          );
      }
    },
    [reelsSort]
  );

  const renderHeader = useCallback(
    ({ collapsedHeaderHeight }: HeaderRendererProps) => (
      <View onLayout={handleHeaderLayout}>
        <CollapseSync
          source={collapsedHeaderHeight}
          target={collapsedHeaderHeightSV}
        />
        <InstagramHeader />
      </View>
    ),
    [collapsedHeaderHeightSV, handleHeaderLayout]
  );

  const renderTabContent = useCallback(
    ({ activePercentage, route }: TabContentProps & { route: Route }) => (
      <InstagramTabContent
        activePercentage={activePercentage}
        route={route}
        isSortMenuOpen={isSortMenuOpen}
      />
    ),
    [isSortMenuOpen]
  );

  const renderTabBar = useCallback(
    (props: TabBarProps) => (
      <TabBar
        {...props}
        style={styles.tabBar}
        tabContentStyle={styles.tabContent}
        renderTabContent={renderTabContent}
        onTabPress={handleTabPress}
      />
    ),
    [handleTabPress, renderTabContent]
  );

  const tabBarConfig: TabBarConfig = useMemo(
    () => ({
      renderTabBar,
      tabBarType: 'primary',
      tabBarDynamicWidthEnabled: false,
      tabBarIndicatorStyle: styles.indicator,
      tabBarStyle: styles.tabBar,
    }),
    [renderTabBar]
  );

  const overlayStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          Math.max(0, headerHeightSV.value - collapsedHeaderHeightSV.value) +
          metrics.tabBarHeight,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <TabView
        navigationState={navigationState}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        renderHeader={renderHeader}
        tabBarConfig={tabBarConfig}
        initialLayout={INITIAL_LAYOUT}
        tabViewCarouselStyle={styles.carousel}
      />
      {isSortMenuOpen && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <Pressable style={styles.backdrop} onPress={closeSortMenu} />
          <ReelsSortMenu
            value={reelsSort}
            onChange={handleSortChange}
            style={styles.sortMenu}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: metrics.tabBarHeight,
    backgroundColor: colors.background,
  },
  tabContent: {
    width: metrics.tabContentWidth,
    height: '100%',
  },
  indicator: {
    left: (metrics.tabContentWidth - metrics.tabIndicatorWidth) / 2,
    width: metrics.tabIndicatorWidth,
    height: 2,
    backgroundColor: colors.textPrimary,
  },
  carousel: {
    backgroundColor: colors.background,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sortMenu: {
    position: 'absolute',
    top: 6,
    left: TAB_WIDTH + 8,
  },
});
