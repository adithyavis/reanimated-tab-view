import type { ScrollViewProps } from 'react-native';
import type { Route, Scene } from './common';
import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import type { TextStyle } from 'react-native';
import type { TabContentProps } from './TabContent';

export type TabBarProps = Omit<
  ScrollViewProps,
  'children' | 'indicatorStyle'
> & {
  activeColor?: string;
  inactiveColor?: string;
  getLabelText?: (scene: Scene) => string | undefined;
  renderTabContent?: (
    props: TabContentProps & { route: Route }
  ) => React.ReactNode;
  onTabPress?: (scene: Scene) => void;
  onTabLongPress?: (scene: Scene) => void;
  tabContentStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  tabStyle?: StyleProp<ViewStyle>;
};

export type RouteIndexToTabWidthMap = {
  [key: number]: number;
};

export type RouteIndexToTabContentWidthMap = {
  [key: number]: number;
};

export type RouteIndexToTabOffsetMap = {
  [key: number]: number;
};
