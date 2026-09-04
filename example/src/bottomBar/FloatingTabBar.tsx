import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  type SharedValue,
} from 'react-native-reanimated';
import type { Route } from 'reanimated-tab-view';
import {
  AppsIcon,
  ArcadeIcon,
  GamesIcon,
  SearchIcon,
  TodayIcon,
} from './assets/TabIcons';
import type { IconProps } from './assets/icon';
import { colors, metrics } from './theme';

const TAB_ICONS: Record<string, React.ComponentType<IconProps>> = {
  today: TodayIcon,
  games: GamesIcon,
  apps: AppsIcon,
  arcade: ArcadeIcon,
  search: SearchIcon,
};

const LABEL_GAP = 8;
const BAR_TOP_PADDING = 6;
const FADE_HEIGHT = 40;
const FADE_COLORS = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.35)',
  'rgba(0, 0, 0, 0.78)',
] as const;
const FADE_LOCATIONS = [0, 0.45, 1] as const;
const TRANSPARENT = 'rgba(255, 255, 255, 0)';

type FloatingTabProps = {
  route: Route;
  index: number;
  selectedIndex: number;
  previousIndex: number;
  labelWidth: number;
  animatedRouteIndex: SharedValue<number>;
  onPress: (route: Route) => void;
};

const FloatingTab = React.memo<FloatingTabProps>(
  ({
    route,
    index,
    selectedIndex,
    previousIndex,
    labelWidth,
    animatedRouteIndex,
    onPress,
  }) => {
    const Icon = TAB_ICONS[route.key] ?? AppsIcon;
    const isSelected = index === selectedIndex;

    const activeness = useDerivedValue(() => {
      const routeIndex = animatedRouteIndex.value;

      if (previousIndex === selectedIndex) {
        return Math.max(0, 1 - Math.abs(routeIndex - index));
      }

      const progress = Math.min(
        1,
        Math.abs(routeIndex - previousIndex) /
          Math.abs(selectedIndex - previousIndex)
      );
      if (index === selectedIndex) {
        return progress;
      }
      if (index === previousIndex) {
        return 1 - progress;
      }
      return 0;
    }, [index, previousIndex, selectedIndex]);

    const animatedPillStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        activeness.value,
        [0, 1],
        [TRANSPARENT, colors.tabSelected]
      ),
    }));

    const animatedIconStyle = useAnimatedStyle(() => ({
      opacity: 0.7 + 0.3 * activeness.value,
    }));

    const animatedLabelStyle = useAnimatedStyle(
      () => ({
        width: (labelWidth + LABEL_GAP) * activeness.value,
        opacity: activeness.value,
      }),
      [labelWidth]
    );

    const handlePress = useCallback(() => onPress(route), [onPress, route]);

    return (
      <Pressable
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={route.title}
      >
        <Animated.View style={[styles.tab, animatedPillStyle]}>
          <Animated.View style={animatedIconStyle}>
            <Icon color={colors.textPrimary} />
          </Animated.View>
          <Animated.View style={[styles.labelClip, animatedLabelStyle]}>
            <Text
              numberOfLines={1}
              style={[styles.label, { width: labelWidth }]}
            >
              {route.title}
            </Text>
          </Animated.View>
        </Animated.View>
      </Pressable>
    );
  }
);

export const useTabBarClearance = () => {
  const insets = useSafeAreaInsets();
  return (
    BAR_TOP_PADDING +
    metrics.tabBarHeight +
    Math.max(insets.bottom, metrics.tabBarMargin)
  );
};

type FloatingTabBarProps = {
  routes: Route[];
  selectedIndex: number;
  previousIndex: number;
  animatedRouteIndex: SharedValue<number>;
  onTabPress: (route: Route) => void;
};

export const FloatingTabBar = React.memo<FloatingTabBarProps>(
  ({
    routes,
    selectedIndex,
    previousIndex,
    animatedRouteIndex,
    onTabPress,
  }) => {
    const insets = useSafeAreaInsets();
    const [labelWidths, setLabelWidths] = useState<Record<string, number>>({});

    const handleLabelLayout = useCallback(
      (key: string) =>
        ({ nativeEvent }: LayoutChangeEvent) => {
          const width = Math.ceil(nativeEvent.layout.width) + 2;
          setLabelWidths((widths) =>
            widths[key] === width ? widths : { ...widths, [key]: width }
          );
        },
      []
    );

    return (
      <View
        pointerEvents="box-none"
        style={[
          styles.container,
          { paddingBottom: Math.max(insets.bottom, metrics.tabBarMargin) },
        ]}
      >
        <LinearGradient
          colors={FADE_COLORS}
          locations={FADE_LOCATIONS}
          style={styles.fade}
          pointerEvents="none"
        />
        <BlurView
          intensity={60}
          tint="systemChromeMaterialDark"
          blurMethod="dimezisBlurViewSdk31Plus"
          style={styles.bar}
        >
          {routes.map((route, index) => (
            <FloatingTab
              key={route.key}
              route={route}
              index={index}
              selectedIndex={selectedIndex}
              previousIndex={previousIndex}
              labelWidth={labelWidths[route.key] ?? 0}
              animatedRouteIndex={animatedRouteIndex}
              onPress={onTabPress}
            />
          ))}
        </BlurView>

        <View style={styles.measureLayer} pointerEvents="none" aria-hidden>
          {routes.map((route) => (
            <Text
              key={route.key}
              numberOfLines={1}
              style={styles.label}
              onLayout={handleLabelLayout(route.key)}
            >
              {route.title}
            </Text>
          ))}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: metrics.tabBarMargin,
    paddingTop: BAR_TOP_PADDING,
    height: 80,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: -FADE_HEIGHT,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: metrics.tabBarHeight,
    borderRadius: metrics.tabBarHeight / 2,
    paddingHorizontal: 6,
    backgroundColor: colors.tabBar,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.tabBarBorder,
    overflow: 'hidden',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: metrics.tabHeight,
    paddingHorizontal: 11,
    borderRadius: metrics.tabHeight / 2,
  },
  labelClip: {
    overflow: 'hidden',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: LABEL_GAP,
  },
  measureLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'flex-start',
    opacity: 0,
  },
});
