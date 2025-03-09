import { View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import type { TabBarProps } from '../types/TabBar';
import type { Layout, Route } from '../types/common';
import { TabContent } from './TabContent';
import { StyleSheet } from 'react-native';
import { useTabBarAutoScroll } from '../hooks/useTabBarAutoScroll';
import TabIndicator from './TabIndicator';
import { TAB_BAR_HEIGHT } from '../constants/tabBar';
import Tab from './Tab';
import { usePropsContext } from '../providers/Props';
import { useInternalContext } from '../providers/Internal';
import type { LayoutChangeEvent } from 'react-native';
import TabContentContainer from './TabContentContainer';
import { useTabLayoutContext } from '../providers/TabLayout';

const INITIAL_TAB_BAR_LAYOUT: Layout = {
  width: 0,
  height: 0,
};

export const TabBar = React.memo((props: TabBarProps) => {
  //#region props
  const {
    activeColor,
    inactiveColor,
    tabContentStyle: tabContentContainerStyle,
    tabStyle,
    labelStyle,
    indicatorStyle,
    style: tabBarContainerStyle,
    getLabelText,
    renderTabContent,
    onTabPress,
    onTabLongPress,
    ...restProps
  } = props;
  //#endregion

  //#region context
  const {
    navigationState,
    tabBarScrollEnabled,
    tabBarDynamicWidthEnabled,
    scrollableTabWidth,
  } = usePropsContext();

  const { currentRouteIndex, routes, tabViewLayout, noOfRoutes } =
    useInternalContext();

  const { routeIndexToTabContentWidthMap } = useTabLayoutContext();
  //#endregion

  //#region variables
  const flatListRef = useRef<FlatList>(null);

  const data: Route[] = routes;

  const [tabBarLayout, setTabBarLayout] = useState<Layout>({
    ...INITIAL_TAB_BAR_LAYOUT,
    ...{ width: tabViewLayout.width, height: TAB_BAR_HEIGHT },
  });
  //#endregion

  //#region callbacks
  const onTabBarLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { width, height } = nativeEvent.layout;
      setTabBarLayout((prevLayout) => ({
        ...prevLayout,
        width,
        height,
      }));
    },
    [setTabBarLayout]
  );
  //#endregion

  //#region hooks
  const { autoScrollToRouteIndex, handleScrollToIndexFailed } =
    useTabBarAutoScroll(flatListRef, currentRouteIndex, tabBarLayout);
  //#endregion

  //#region render memos
  const renderItem = useCallback(
    ({ item, index: routeIndex }: { item: Route; index: number }) => {
      const route = item;
      const scene = { route };
      const handlePressTab = () => {
        onTabPress?.(scene);
        autoScrollToRouteIndex(routeIndex);
      };
      const totalTabContentWidth = new Array(noOfRoutes)
        .fill(0)
        .reduce((acc, _, index) => {
          return acc + (routeIndexToTabContentWidthMap[index] ?? 0);
        }, 0);
      const extraPaddingHorizontalPerTab = Math.max(
        0,
        (tabBarLayout.width - totalTabContentWidth) / noOfRoutes / 2
      );
      const fixedWidth = tabBarScrollEnabled
        ? scrollableTabWidth
        : tabBarLayout.width / navigationState.routes.length;
      const fixedTabWidthStyle = {
        width: fixedWidth,
      };
      const extraPaddingHorizontalPerTabStyle = {
        paddingHorizontal: extraPaddingHorizontalPerTab,
      };
      return (
        <Tab
          index={routeIndex}
          route={route}
          style={[
            styles.tab,
            tabStyle,
            !tabBarDynamicWidthEnabled && fixedTabWidthStyle,
            tabBarDynamicWidthEnabled &&
              !tabBarScrollEnabled &&
              extraPaddingHorizontalPerTabStyle,
          ]}
          onTabPress={handlePressTab}
          onTabLongPress={onTabLongPress}
        >
          <TabContentContainer
            index={routeIndex}
            style={tabContentContainerStyle}
          >
            {(activePercentage) =>
              renderTabContent ? (
                renderTabContent({
                  activePercentage,
                  route,
                })
              ) : (
                <TabContent
                  activePercentage={activePercentage}
                  activeColor={activeColor}
                  inactiveColor={inactiveColor}
                  label={getLabelText?.({ route })}
                  style={tabContentContainerStyle}
                  labelStyle={labelStyle}
                />
              )
            }
          </TabContentContainer>
        </Tab>
      );
    },
    [
      routeIndexToTabContentWidthMap,
      noOfRoutes,
      tabBarLayout.width,
      tabBarScrollEnabled,
      scrollableTabWidth,
      navigationState.routes.length,
      tabBarDynamicWidthEnabled,
      onTabLongPress,
      tabContentContainerStyle,
      onTabPress,
      autoScrollToRouteIndex,
      renderTabContent,
      activeColor,
      inactiveColor,
      getLabelText,
      labelStyle,
      tabStyle,
    ]
  );

  const tabIndicatorComponent = useMemo(() => {
    return <TabIndicator style={indicatorStyle} />;
  }, [indicatorStyle]);
  //#endregion

  //#region render
  return (
    <View style={[styles.tabBarContainer, tabBarContainerStyle]}>
      {tabBarScrollEnabled ? (
        <FlatList
          ref={flatListRef}
          {...restProps}
          horizontal
          data={data}
          renderItem={renderItem}
          removeClippedSubviews={false}
          scrollEnabled={tabBarScrollEnabled}
          showsHorizontalScrollIndicator={false}
          onScrollToIndexFailed={handleScrollToIndexFailed}
          ListHeaderComponent={tabIndicatorComponent}
          style={styles.tabBar}
          onLayout={onTabBarLayout}
        />
      ) : (
        <View
          {...restProps}
          style={[styles.tabBar, styles.nonScrollableTabBar]}
          onLayout={onTabBarLayout}
        >
          {routes.map((route, index) => (
            <React.Fragment key={index}>
              {renderItem({ item: route, index })}
            </React.Fragment>
          ))}
          <TabIndicator style={indicatorStyle} />
        </View>
      )}
    </View>
  );
  //#endregion
});

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#25A0F6',
    height: TAB_BAR_HEIGHT,
  },
  tabBar: {
    height: '100%',
  },
  nonScrollableTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
