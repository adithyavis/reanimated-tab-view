import type { ViewProps } from 'react-native';
import type { StyleProp } from 'react-native';
import type { TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type TabContentProps = Omit<ViewProps, 'children'> & {
  activePercentage: SharedValue<number>;
  label?: string;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: StyleProp<TextStyle>;
};
