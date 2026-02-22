import React, { useMemo, useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  TabView,
  TabBar,
  type TabBarProps,
  type NavigationState,
  type TabBarConfig,
} from 'reanimated-tab-view';
import { HEADER_HEIGHT, InstagramHeader } from './InstagramHeader';
import { InstagramTabContent } from './InstagramTabContent';
import { InstagramPhotoGrid } from './InstagramPhotosGrid';

const { width: windowWidth } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 40;
const initialLayout = {
  tabView: {
    width: windowWidth,
  },
  tabBar: {
    height: TAB_BAR_HEIGHT,
  },
  tabViewHeader: {
    height: HEADER_HEIGHT,
  },
};

const Routes = [
  {
    key: 'photos',
  },
  {
    key: 'videos',
  },
  {
    key: 'tagged',
  },
];

export const InstagramTabView = () => {
  const [navigationState, setNavigationState] = React.useState<NavigationState>(
    {
      index: 0,
      routes: Routes,
    }
  );
  const handleIndexChange = useCallback((index: number) => {
    setNavigationState((prev) => ({ ...prev, index }));
  }, []);

  const renderScene = useCallback(() => {
    return <InstagramPhotoGrid />;
  }, []);

  const renderHeader = useCallback(() => {
    return <InstagramHeader />;
  }, []);

  const renderTabContent = useCallback(({ activePercentage, route }) => {
    return (
      <InstagramTabContent
        activePercentage={activePercentage}
        route={route}
        style={styles.label}
      />
    );
  }, []);

  const renderTabBar = useCallback(
    (props: TabBarProps) => (
      <TabBar
        {...props}
        style={styles.tabBar}
        renderTabContent={renderTabContent}
      />
    ),
    [renderTabContent]
  );

  const tabBarConfig: TabBarConfig = useMemo(
    () => ({
      renderTabBar,
      tabBarType: 'primary' as const,
      tabBarDynamicWidthEnabled: false,
      tabBarIndicatorStyle: styles.indicator,
      tabBarStyle: styles.tabBar,
    }),
    [renderTabBar]
  );

  return (
    <TabView
      onIndexChange={handleIndexChange}
      navigationState={navigationState}
      renderScene={renderScene}
      tabBarConfig={tabBarConfig}
      sceneContainerGap={10}
      renderHeader={renderHeader}
      initialLayout={initialLayout}
      tabViewCarouselStyle={styles.tabViewCarousel}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgb(32, 32, 32)',
    height: TAB_BAR_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(98, 98, 98)',
  },
  label: {
    paddingHorizontal: 10,
  },
  indicator: {
    backgroundColor: 'white',
    borderRadius: 1,
  },
  tabViewCarousel: {
    backgroundColor: 'rgb(32, 32, 32)',
  },
});
