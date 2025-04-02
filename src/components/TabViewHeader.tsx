import React, { useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import type { TabViewHeaderProps } from '../types/TabViewHeaderProps';
import { useInternalContext } from '../providers/Internal';
import { useScrollableContext } from '../providers/Scrollable';
import { usePropsContext } from '../providers/Props';

export const TabViewHeader = React.memo<TabViewHeaderProps>(({ style }) => {
  const { tabViewHeaderLayout, setTabViewHeaderLayout } = useInternalContext();

  const { renderHeader } = usePropsContext();

  const { animatedTranslateYSV } = useScrollableContext();

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
    const tabViewHeaderHeight = tabViewHeaderLayout.height || 1;
    if (tabViewHeaderHeight === 0) {
      return 0;
    }
    return (animatedTranslateYSV.value / tabViewHeaderHeight) * 100;
  });

  const collapsedHeaderHeightSV = useDerivedValue(() => {
    return animatedTranslateYSV.value;
  });

  return (
    <Animated.View onLayout={onTabViewHeaderLayout} style={style}>
      {renderHeader?.({
        collapsedPercentage: collapsedPercentageSV,
        collapsedHeaderHeight: collapsedHeaderHeightSV,
      })}
    </Animated.View>
  );
});
