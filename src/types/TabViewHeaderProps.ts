import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';

export type TabViewHeaderProps = Omit<AnimatedProps<ViewProps>, 'children'>;
