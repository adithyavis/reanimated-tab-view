import React, { useCallback } from 'react';
import Animated from 'react-native-reanimated';
import type { TabViewHeaderProps } from '../types/TabViewHeaderProps';
import { useInternalContext } from '../providers/Internal';
import type { LayoutChangeEvent } from 'react-native';

export const TabViewHeader = React.memo<TabViewHeaderProps>(
  ({ children, style }) => {
    const { setTabViewHeaderLayout } = useInternalContext();

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

    return (
      <Animated.View onLayout={onTabViewHeaderLayout} style={style}>
        {children}
      </Animated.View>
    );
  }
);
