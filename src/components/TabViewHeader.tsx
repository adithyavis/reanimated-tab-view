import React, { useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import type { TabViewHeaderProps } from '../types/TabViewHeaderProps';
import { useInternalContext } from '../providers/Internal';
import { useHeaderContext } from '../providers/Header';
import { usePropsContext } from '../providers/Props';

export const TabViewHeader = React.memo<TabViewHeaderProps>(({ style }) => {
  const { setTabViewHeaderLayout } = useInternalContext();

  const { renderHeader } = usePropsContext();

  const { animatedTranslateYSV, translateYBoundsUpperSV } = useHeaderContext();

  const onTabViewHeaderLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { width, height } = nativeEvent.layout;
      setTabViewHeaderLayout((prevLayout) => ({
        ...prevLayout,
        width,
        height,
      }));
    },
    [setTabViewHeaderLayout]
  );

  const collapsedPercentageSV = useDerivedValue(() => {
    const translateYBoundsUpper = translateYBoundsUpperSV.value;
    if (translateYBoundsUpper === 0) {
      return 0;
    }
    return (animatedTranslateYSV.value / translateYBoundsUpper) * 100;
  });

  return (
    <Animated.View onLayout={onTabViewHeaderLayout} style={style}>
      {renderHeader?.({
        collapsedPercentage: collapsedPercentageSV,
        collapsedHeaderHeight: animatedTranslateYSV,
      })}
    </Animated.View>
  );
});
