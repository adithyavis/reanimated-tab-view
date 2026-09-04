import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  TabBar,
  TabView,
  type HeaderRendererProps,
  type NavigationState,
  type Route,
  type SceneRendererProps,
  type TabBarConfig,
  type TabBarProps,
  type TabContentProps,
} from 'reanimated-tab-view';
import { HEADER_HEIGHT, RedditHeader } from './RedditHeader';
import { RedditTabContent } from './RedditTabContent';
import {
  AboutScene,
  CommentsScene,
  PostsScene,
  SavedScene,
} from './RedditScenes';
import { colors, metrics } from './theme';

const ROUTES: Route[] = [
  { key: 'posts', title: 'Posts' },
  { key: 'comments', title: 'Comments' },
  { key: 'saved', title: 'Saved' },
  { key: 'about', title: 'About' },
];

const SCENES = {
  posts: PostsScene,
  comments: CommentsScene,
  saved: SavedScene,
  about: AboutScene,
};

export const RedditTabView = () => {
  const { width: windowWidth } = useWindowDimensions();

  const [navigationState, setNavigationState] = useState<NavigationState>({
    index: 0,
    routes: ROUTES,
  });

  const handleIndexChange = useCallback((index: number) => {
    setNavigationState((state) => ({ ...state, index }));
  }, []);

  const renderScene = useCallback(({ route }: SceneRendererProps) => {
    const Scene = SCENES[route.key as keyof typeof SCENES];
    return <Scene />;
  }, []);

  const renderHeader = useCallback(
    (props: HeaderRendererProps) => <RedditHeader {...props} />,
    []
  );

  const renderTabContent = useCallback(
    ({ activePercentage, route }: TabContentProps & { route: Route }) => (
      <RedditTabContent activePercentage={activePercentage} route={route} />
    ),
    []
  );

  const renderTabBar = useCallback(
    (props: TabBarProps) => (
      <TabBar {...props} renderTabContent={renderTabContent} />
    ),
    [renderTabContent]
  );

  const tabBarConfig: TabBarConfig = useMemo(
    () => ({
      renderTabBar,
      tabBarType: 'primary',
      tabBarDynamicWidthEnabled: false,
      tabBarStyle: styles.tabBar,
      tabBarIndicatorStyle: styles.indicator,
      tabStyle: styles.tab,
    }),
    [renderTabBar]
  );

  const initialLayout = useMemo(
    () => ({
      tabView: { width: windowWidth },
      tabBar: { height: metrics.tabBarHeight },
      tabViewHeader: { height: HEADER_HEIGHT },
    }),
    [windowWidth]
  );

  return (
    <TabView
      navigationState={navigationState}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      renderHeader={renderHeader}
      tabBarConfig={tabBarConfig}
      initialLayout={initialLayout}
      style={styles.tabView}
      tabViewCarouselStyle={styles.carousel}
    />
  );
};

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: colors.background,
  },
  carousel: {
    backgroundColor: colors.background,
  },
  tabBar: {
    height: metrics.tabBarHeight,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  tab: {
    paddingHorizontal: 4,
  },
  indicator: {
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
});
