import React from 'react';
import type { View } from 'react-native';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import type { TabViewHeaderProps } from '../types/TabViewHeaderProps';
import { useInternalContext } from '../providers/Internal';
import { useHeaderContext } from '../providers/Header';
import { usePropsContext } from '../providers/Props';
import { useLayout } from '../hooks/useLayout';

export const TabViewHeader = React.memo<TabViewHeaderProps>(({ style }) => {
  const { setTabViewHeaderLayout } = useInternalContext();

  const { renderHeader } = usePropsContext();

  const { animatedTranslateYSV, translateYBoundsUpperSV } = useHeaderContext();

  const { ref: tabViewHeaderRef, onLayout: onTabViewHeaderLayout } =
    useLayout<View>(setTabViewHeaderLayout);

  const collapsedPercentageSV = useDerivedValue(() => {
    const translateYBoundsUpper = translateYBoundsUpperSV.value;
    if (translateYBoundsUpper === 0) {
      return 0;
    }
    return (animatedTranslateYSV.value / translateYBoundsUpper) * 100;
  });

  return (
    <Animated.View
      ref={tabViewHeaderRef}
      onLayout={onTabViewHeaderLayout}
      style={style}
    >
      {renderHeader?.({
        collapsedPercentage: collapsedPercentageSV,
        collapsedHeaderHeight: animatedTranslateYSV,
      })}
    </Animated.View>
  );
});
