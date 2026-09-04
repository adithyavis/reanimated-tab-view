import type { SvgProps } from 'react-native-svg';

export type IconProps = Omit<SvgProps, 'color'> & {
  color?: string;
  size?: number;
};

export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_STROKE_WIDTH = 2;
