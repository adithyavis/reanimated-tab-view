import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { TabIndicatorProps } from '../types/TabIndicator';
import { useTabLayoutContext } from '../providers/TabLayout';
import { useInternalContext } from '../providers/Internal';
import { usePropsContext } from '../providers/Props';

const TabIndicator = React.memo((props: TabIndicatorProps) => {
  const { style } = props;

  const { tabBarType, tabBarPosition } = usePropsContext();
  const { animatedRouteIndex } = useInternalContext();

  const {
    routeIndexToTabWidthMapSV,
    routeIndexToTabOffsetMapSV,
    routeIndexToTabContentWidthMapSV,
  } = useTabLayoutContext();

  const animatedTabIndicatorContainerStyle = useAnimatedStyle(() => {
    const animatedRouteIndexFloor = Math.floor(animatedRouteIndex.value);
    const animatedRouteIndexCeil = animatedRouteIndexFloor + 1;

    const translateXFloor =
      tabBarType === 'primary'
        ? (routeIndexToTabOffsetMapSV.value[animatedRouteIndexFloor] ?? 0) +
          (routeIndexToTabWidthMapSV.value[animatedRouteIndexFloor] ?? 0) / 2 -
          (routeIndexToTabContentWidthMapSV.value[animatedRouteIndexFloor] ??
            0) /
            2
        : routeIndexToTabOffsetMapSV.value[animatedRouteIndexFloor] ?? 0;
    const translateXCeil =
      tabBarType === 'primary'
        ? (routeIndexToTabOffsetMapSV.value[animatedRouteIndexCeil] ?? 0) +
          (routeIndexToTabWidthMapSV.value[animatedRouteIndexCeil] ?? 0) / 2 -
          (routeIndexToTabContentWidthMapSV.value[animatedRouteIndexCeil] ??
            0) /
            2
        : routeIndexToTabOffsetMapSV.value[animatedRouteIndexCeil] ?? 0;
    const translateX =
      translateXFloor *
        (1 - (animatedRouteIndex.value - animatedRouteIndexFloor)) +
      translateXCeil *
        (1 - (animatedRouteIndexCeil - animatedRouteIndex.value));

    const widthFloor =
      tabBarType === 'primary'
        ? routeIndexToTabContentWidthMapSV.value[animatedRouteIndexFloor] ?? 0
        : routeIndexToTabWidthMapSV.value[animatedRouteIndexFloor] ?? 0;
    const widthCeil =
      tabBarType === 'primary'
        ? routeIndexToTabContentWidthMapSV.value[animatedRouteIndexCeil] ?? 0
        : routeIndexToTabWidthMapSV.value[animatedRouteIndexCeil] ?? 0;
    const width =
      widthFloor * (1 - (animatedRouteIndex.value - animatedRouteIndexFloor)) +
      widthCeil * (1 - (animatedRouteIndexCeil - animatedRouteIndex.value));
    return { transform: [{ translateX }], width };
  }, [tabBarType]);

  return (
    <Animated.View
      style={[styles.tabIndicatorContainer, animatedTabIndicatorContainerStyle]}
    >
      <Animated.View
        style={[
          styles.tabIndicator,
          tabBarType === 'primary' && styles.primaryTabIndicator,
          tabBarPosition === 'top' && styles.topTabIndicator,
          tabBarPosition === 'bottom' && styles.bottomTabIndicator,
          style,
        ]}
      />
    </Animated.View>
  );
});
export default TabIndicator;

const styles = StyleSheet.create({
  tabIndicatorContainer: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '100%',
  },
  topTabIndicator: {
    bottom: 0,
  },
  bottomTabIndicator: {
    top: 0,
  },
  primaryTabIndicator: {
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
  },
});
