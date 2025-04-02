import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';

import TabViewCarousel, {
  type CarouselImperativeHandle,
} from './TabViewCarousel';
import { type TabViewMethods, type TabViewProps } from '../types/TabView';
import type { LayoutChangeEvent } from 'react-native';
import type { Layout } from '../types/common';
import { TabBar } from './TabBar';
import { TabLayoutContextProvider } from '../providers/TabLayout';
import {
  InternalContextProvider,
  useInternalContext,
} from '../providers/Internal';
import { PropsContextProvider, usePropsContext } from '../providers/Props';
import { SCROLLABLE_TAB_WIDTH, TAB_BAR_HEIGHT } from '../constants/tabBar';
import useHandleIndexChange from '../hooks/useHandlerIndexChange';
import { TabViewHeader } from './TabViewHeader';
import { ScrollableContextProvider } from '../providers/Scrollable';
import { useGestureContentTranslateYStyle } from '../hooks/scrollable/useGestureContentTranslateYStyle';
import { useScrollLikePanGesture } from '../hooks/scrollable/useScrollLikePanGesture';

export const TabViewWithoutProviders = React.memo(() => {
  //#region context
  const { tabBarPosition, tabBarStyle, tabStyle, renderTabBar } =
    usePropsContext();

  const { tabViewLayout, tabViewCarouselRef, setTabViewLayout } =
    useInternalContext();
  //#endregion

  //#region styles
  const containerLayoutStyle = useMemo(() => {
    const width: number | `${number}%` = tabViewLayout?.width || '100%';
    return { width };
  }, [tabViewLayout]);

  const contentStyle = useMemo(() => {
    return tabViewLayout.height
      ? {
          height: tabViewLayout.height,
        }
      : { flex: 1 };
  }, [tabViewLayout]);

  const animatedTranslateYStyle = useGestureContentTranslateYStyle();
  //#endregion

  //#region variables
  const scrollLikePanGesture = useScrollLikePanGesture();
  //#endregion

  //#region hooks
  useHandleIndexChange();
  //#endregion

  //#region callbacks
  const onTabViewLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { width, height } = nativeEvent.layout;
      setTabViewLayout((prevLayout) => ({
        ...prevLayout,
        width,
        height,
      }));
    },
    [setTabViewLayout]
  );
  //#endregion

  //#region render memos
  const tabBar = useMemo(() => {
    if (renderTabBar) {
      return renderTabBar({
        getLabelText: (scene) => scene.route.title,
        tabStyle,
        style: tabBarStyle,
      });
    }
    return (
      <TabBar
        getLabelText={(scene) => scene.route.title}
        tabStyle={tabStyle}
        style={tabBarStyle}
      />
    );
  }, [renderTabBar, tabStyle, tabBarStyle]);
  //#endregion

  //#region render
  return (
    <GestureDetector gesture={scrollLikePanGesture}>
      <View
        style={[styles.container, containerLayoutStyle]}
        onLayout={onTabViewLayout}
      >
        <TabViewHeader style={animatedTranslateYStyle} />
        <Animated.View style={[contentStyle, animatedTranslateYStyle]}>
          {tabBarPosition === 'top' && tabBar}
          <TabViewCarousel ref={tabViewCarouselRef} />
          {tabBarPosition === 'bottom' && tabBar}
        </Animated.View>
      </View>
    </GestureDetector>
  );
  //#endregion
});

export const TabView = React.memo(
  React.forwardRef<TabViewMethods, TabViewProps>((props, ref) => {
    //#region props
    const {
      navigationState,
      initialLayout,
      animatedRouteIndex: providedAnimatedRouteIndexSV,
      sceneContainerStyle,
      keyboardDismissMode = 'auto',
      swipeEnabled = true,
      renderMode = 'all',
      tabBarConfig,
      jumpMode = 'smooth',
      sceneContainerGap = 0,
      renderHeader,
      renderScene,
      onIndexChange,
      onSwipeEnd,
      onSwipeStart,
    } = props;

    const {
      tabBarType = 'secondary',
      tabBarPosition = 'top',
      tabBarScrollEnabled = false,
      tabBarDynamicWidthEnabled: _tabBarDynamicWidthEnabled,
      scrollableTabWidth = SCROLLABLE_TAB_WIDTH,
      tabBarStyle,
      tabBarIndicatorStyle,
      tabStyle,
      renderTabBar,
    } = tabBarConfig ?? {};
    //#endregion

    //#region variables
    const [tabViewLayout, setTabViewLayout] = useState<Layout>({
      width: 0,
      height: 0,
      ...initialLayout?.tabView,
    });

    const [tabBarLayout, setTabBarLayout] = useState<Layout>({
      width: tabViewLayout.width,
      height: TAB_BAR_HEIGHT,
    });

    const [tabViewCarouselLayout, setTabViewCarouselLayout] = useState<Layout>({
      width: tabViewLayout.width,
      height: tabViewLayout.height - tabBarLayout.height,
    });

    const [tabViewHeaderLayout, setTabViewHeaderLayout] = useState<Layout>({
      width: initialLayout?.tabView?.width ?? 0,
      height: 0,
      ...initialLayout?.tabViewHeader,
    });

    const tabViewCarouselRef = useRef<CarouselImperativeHandle>(null);

    const animatedRouteIndex = useSharedValue(navigationState.index);

    const [initialRouteIndex] = useState(navigationState.index);
    const [currentRouteIndex, setCurrentRouteIndex] =
      useState(initialRouteIndex);

    const routes = useMemo(
      () => navigationState.routes,
      [navigationState.routes]
    );
    const noOfRoutes = routes.length;

    const tabBarDynamicWidthEnabled = useMemo(() => {
      if (_tabBarDynamicWidthEnabled !== undefined) {
        return _tabBarDynamicWidthEnabled;
      }
      if (tabBarType === 'primary') {
        return true;
      }
      return false;
    }, [_tabBarDynamicWidthEnabled, tabBarType]);
    //#endregion

    //#region handlers
    const jumpTo = useCallback((routeKey: string) => {
      tabViewCarouselRef.current?.jumpToRoute(routeKey);
    }, []);
    //#endregion

    //#region hooks
    useImperativeHandle(ref, () => ({
      jumpTo,
    }));
    //#endregion

    //#region context
    const propsContextValue = useMemo(() => {
      return {
        navigationState,
        renderMode,
        tabBarType,
        tabBarPosition,
        tabBarScrollEnabled,
        tabBarDynamicWidthEnabled,
        scrollableTabWidth,
        tabBarStyle,
        tabBarIndicatorStyle,
        tabStyle,
        swipeEnabled,
        jumpMode,
        sceneContainerGap,
        sceneContainerStyle,
        keyboardDismissMode,
        providedAnimatedRouteIndexSV,
        renderTabBar,
        renderScene,
        renderHeader,
        onIndexChange,
        onSwipeEnd,
        onSwipeStart,
      };
    }, [
      navigationState,
      renderMode,
      tabBarType,
      tabBarPosition,
      tabBarScrollEnabled,
      tabBarDynamicWidthEnabled,
      scrollableTabWidth,
      tabBarStyle,
      tabBarIndicatorStyle,
      tabStyle,
      swipeEnabled,
      jumpMode,
      sceneContainerGap,
      sceneContainerStyle,
      keyboardDismissMode,
      providedAnimatedRouteIndexSV,
      renderTabBar,
      renderScene,
      renderHeader,
      onIndexChange,
      onSwipeEnd,
      onSwipeStart,
    ]);

    const internalContextValue = useMemo(() => {
      return {
        tabViewLayout,
        tabViewHeaderLayout,
        tabBarLayout,
        tabViewCarouselLayout,
        tabViewCarouselRef,
        routes,
        noOfRoutes,
        animatedRouteIndex,
        initialRouteIndex,
        currentRouteIndex,
        setCurrentRouteIndex,
        jumpTo,
        setTabViewLayout,
        setTabViewHeaderLayout,
        setTabBarLayout,
        setTabViewCarouselLayout,
      };
    }, [
      tabViewLayout,
      tabViewHeaderLayout,
      tabBarLayout,
      tabViewCarouselLayout,
      tabViewCarouselRef,
      routes,
      noOfRoutes,
      animatedRouteIndex,
      currentRouteIndex,
      setCurrentRouteIndex,
      initialRouteIndex,
      jumpTo,
      setTabViewLayout,
      setTabViewHeaderLayout,
      setTabBarLayout,
      setTabViewCarouselLayout,
    ]);
    //#endregion

    return (
      <PropsContextProvider value={propsContextValue}>
        <InternalContextProvider value={internalContextValue}>
          <TabLayoutContextProvider>
            <ScrollableContextProvider>
              <TabViewWithoutProviders />
            </ScrollableContextProvider>
          </TabLayoutContextProvider>
        </InternalContextProvider>
      </PropsContextProvider>
    );
  })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
