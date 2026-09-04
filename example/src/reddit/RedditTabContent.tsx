import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type { Route } from 'reanimated-tab-view';
import { colors } from './theme';

type RedditTabContentProps = {
  activePercentage: SharedValue<number>;
  route: Route;
};

export const RedditTabContent = React.memo<RedditTabContentProps>(
  function RedditTabContent({ activePercentage, route }) {
    const animatedStyle = useAnimatedStyle(
      () => ({
        color: interpolateColor(
          activePercentage.value,
          [0, 100],
          [colors.textPrimary, colors.textSecondary]
        ),
      }),
      [activePercentage]
    );

    return (
      <Animated.Text numberOfLines={1} style={[styles.label, animatedStyle]}>
        {route.title}
      </Animated.Text>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
