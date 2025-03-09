import React from 'react';
import {
  StyleSheet,
  View,
  type ViewProps,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import { useHandleTabContentLayout } from '../hooks/useTabLayout';
import type { Scene } from '../types';
import { useInternalContext } from '../providers/Internal';

type TabContentContainerProps = Omit<ViewProps, 'children'> & {
  index: number;
  activeColor?: string;
  inactiveColor?: string;
  getLabelText?: (scene: Scene) => string | undefined;
  onTabPress?: (scene: Scene) => void;
  onTabLongPress?: (scene: Scene) => void;
  labelStyle?: StyleProp<TextStyle>;
  children: (activePercentSV: SharedValue<number>) => React.ReactNode;
};

const TabContentContainer = React.memo<TabContentContainerProps>((props) => {
  const { index, style, children: renderTabContent } = props;

  const { animatedRouteIndex } = useInternalContext();
  const { handleTabContentLayout } = useHandleTabContentLayout(index);

  const activePercentSV = useDerivedValue(() => {
    return Math.min(100, 100 * Math.abs(animatedRouteIndex.value - index));
  });

  return (
    <View onLayout={handleTabContentLayout} style={[styles.tabBarItem, style]}>
      {renderTabContent(activePercentSV)}
    </View>
  );
});

export default TabContentContainer;

const styles = StyleSheet.create({
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
