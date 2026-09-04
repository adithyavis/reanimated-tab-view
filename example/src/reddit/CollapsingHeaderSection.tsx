import React, { useCallback } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { headerFade } from './theme';

type CollapsingHeaderSectionProps = {
  collapsedHeaderHeight: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const CollapsingHeaderSection = React.memo<CollapsingHeaderSectionProps>(
  function CollapsingHeaderSection({ collapsedHeaderHeight, style, children }) {
    const topSV = useSharedValue(Number.MAX_SAFE_INTEGER);

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        topSV.value = event.nativeEvent.layout.y;
      },
      [topSV]
    );

    const animatedStyle = useAnimatedStyle(() => {
      const restingTop = topSV.value;
      const distanceToTop = restingTop - collapsedHeaderHeight.value;

      const fadeStart = Math.min(headerFade.fadeStart, restingTop);
      return {
        opacity: interpolate(
          distanceToTop,
          [headerFade.fadeEnd, fadeStart],
          [0, 1],
          Extrapolation.CLAMP
        ),
      };
    }, [collapsedHeaderHeight]);

    return (
      <Animated.View onLayout={handleLayout} style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    );
  }
);
