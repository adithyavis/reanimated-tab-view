import type { SvgProps } from 'react-native-svg';
import { colors } from '../theme';

export type BaseIconProps = Omit<SvgProps, 'color'> & {
  color?: string;
  size?: number;
};

export type IconProps = BaseIconProps & {
  backgroundColor?: string;
  filled?: boolean;
};

export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_STROKE_WIDTH = 1.8;
export const DEFAULT_BACKGROUND = colors.background;
