import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import {
  DEFAULT_BACKGROUND,
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  type IconProps,
} from './icon';

const SPOOL_LINE = 'M2.4 7.9h19.2';
const SPOOL_NOTCHES = 'M8.1 2.4l2.9 5.5M14.2 2.4l2.9 5.5';
const PLAY = 'M10.2 11.4l5 2.85-5 2.85z';

export const ReelsIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  backgroundColor = DEFAULT_BACKGROUND,
  filled = false,
  ...props
}: IconProps) => {
  const detailColor = filled ? backgroundColor : color;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect
        x={2.4}
        y={2.4}
        width={19.2}
        height={19.2}
        rx={5.2}
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={DEFAULT_STROKE_WIDTH}
      />
      <Path
        d={SPOOL_LINE}
        stroke={detailColor}
        strokeWidth={DEFAULT_STROKE_WIDTH}
      />
      <Path
        d={SPOOL_NOTCHES}
        stroke={detailColor}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path d={PLAY} fill={detailColor} />
    </Svg>
  );
};
