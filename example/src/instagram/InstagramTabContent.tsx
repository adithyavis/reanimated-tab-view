import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import type { Route } from 'reanimated-tab-view';
import { GridIcon } from './assets/GridIcon';
import { ReelsIcon } from './assets/ReelsIcon';
import { TaggedIcon } from './assets/TaggedIcon';
import { ChevronDownIcon } from './assets/ChromeIcons';
import type { IconProps } from './assets/icon';
import { colors } from './theme';

const TAB_ICONS: Record<string, React.ComponentType<IconProps>> = {
  posts: GridIcon,
  reels: ReelsIcon,
  tagged: TaggedIcon,
};

type InstagramTabContentProps = {
  activePercentage: SharedValue<number>;
  route: Route;

  isSortMenuOpen: boolean;
};

export const InstagramTabContent = React.memo<InstagramTabContentProps>(
  ({ activePercentage, route, isSortMenuOpen }) => {
    const Icon = TAB_ICONS[route.key] ?? GridIcon;

    const activeIconStyle = useAnimatedStyle(
      () => ({ opacity: Math.max(0, 1 - activePercentage.value / 100) }),
      [activePercentage]
    );

    const inactiveIconStyle = useAnimatedStyle(
      () => ({ opacity: activePercentage.value / 100 }),
      [activePercentage]
    );

    const chevronStyle = useAnimatedStyle(
      () => ({
        transform: [{ rotate: withTiming(isSortMenuOpen ? '180deg' : '0deg') }],
      }),
      [isSortMenuOpen]
    );

    const activeIcon = useMemo(
      () => (
        <Animated.View style={activeIconStyle}>
          <Icon
            filled
            color={colors.textPrimary}
            backgroundColor={colors.background}
          />
        </Animated.View>
      ),
      [Icon, activeIconStyle]
    );

    const inactiveIcon = useMemo(
      () => (
        <Animated.View style={[styles.inactiveIcon, inactiveIconStyle]}>
          <Icon color={colors.iconInactive} />
        </Animated.View>
      ),
      [Icon, inactiveIconStyle]
    );

    return (
      <>
        {activeIcon}
        {inactiveIcon}
        {route.key === 'reels' && (
          <Animated.View style={[styles.chevron, activeIconStyle]}>
            <Animated.View style={chevronStyle}>
              <ChevronDownIcon
                size={14}
                strokeWidth={2.6}
                color={colors.textPrimary}
              />
            </Animated.View>
          </Animated.View>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  inactiveIcon: {
    position: 'absolute',
  },
  chevron: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
});
