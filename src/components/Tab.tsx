import React, { useCallback } from 'react';
import { Pressable, type ViewStyle, type StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
import { useHandleTabLayout } from '../hooks/useTabLayout';
import type { Route, Scene } from '../types';
import { useInternalContext } from '../providers/Internal';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TabProps = {
  index: number;
  route: Route;
  style?: StyleProp<ViewStyle>;
  onTabPress?: (scene: Scene) => void;
  onTabLongPress?: (scene: Scene) => void;
};
const Tab: React.FC<TabProps> = React.memo(
  ({ index, route, style, children, onTabPress, onTabLongPress }) => {
    const { jumpTo } = useInternalContext();

    const { handleTabLayout } = useHandleTabLayout(index);

    const handlePressTabItem = useCallback(() => {
      const scene = { route };
      onTabPress?.(scene);
      jumpTo(route.key);
    }, [jumpTo, onTabPress, route]);
    const handleLongPressTabItem = useCallback(() => {
      const scene = { route };
      onTabLongPress?.(scene);
      jumpTo(route.key);
    }, [jumpTo, onTabLongPress, route]);

    return (
      <AnimatedPressable
        onLayout={handleTabLayout}
        onPress={handlePressTabItem}
        onLongPress={handleLongPressTabItem}
        style={style}
      >
        {children}
      </AnimatedPressable>
    );
  }
);

export default Tab;
