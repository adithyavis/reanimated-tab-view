import type { ViewProps } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import type {
  Layout,
  NavigationState,
  Route,
  SceneRendererProps,
} from './common';
import type { TabBarProps } from './TabBar';
import type { SharedValue } from 'react-native-reanimated';

export type TabBarType = 'primary' | 'secondary';

export type RenderMode = 'all' | 'windowed' | 'lazy';

export type TabBarPosition = 'top' | 'bottom';

export type JumpMode = 'smooth' | 'scrolling' | 'no-animation';

export type KeyboardDismissMode = 'none' | 'on-drag' | 'auto';

export type TabViewProps = Omit<ViewProps, 'children'> & {
  onIndexChange: (index: number) => void;
  navigationState: NavigationState;
  renderScene: (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => React.ReactNode;
  animatedRouteIndex?: SharedValue<number>;
  tabBarConfig?: {
    tabBarPosition?: TabBarPosition;
    tabBarScrollEnabled?: boolean;
    tabBarDynamicWidthEnabled?: boolean;
    scrollableTabWidth?: number;
    tabBarType?: TabBarType;
    tabBarStyle?: StyleProp<ViewStyle>;
    tabBarIndicatorStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    renderTabBar?: (props: TabBarProps) => React.ReactNode;
  };
  // renderLazyPlaceholder?: (props: { route: Route }) => React.ReactNode;
  jumpMode?: JumpMode;
  initialLayout?: Partial<Layout>;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  sceneContainerGap?: number;
  style?: StyleProp<ViewStyle>;
  keyboardDismissMode?: KeyboardDismissMode;
  swipeEnabled?: boolean;
  renderMode?: RenderMode;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
};
