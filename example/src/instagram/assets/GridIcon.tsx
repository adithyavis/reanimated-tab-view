import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  type IconProps,
} from './icon';

const CELL_OFFSETS = [2.6, 9.3, 16];
const CELL_SIZE = 5.4;

export const GridIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  filled = false,
  backgroundColor: _backgroundColor,
  ...props
}: IconProps) => {
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        {CELL_OFFSETS.map((y) =>
          CELL_OFFSETS.map((x) => (
            <Rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={1}
              fill={color}
            />
          ))
        )}
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect
        x={2.4}
        y={2.4}
        width={19.2}
        height={19.2}
        rx={1.6}
        stroke={color}
        strokeWidth={DEFAULT_STROKE_WIDTH}
      />
      <Path
        d="M8.8 2.4v19.2M15.2 2.4v19.2M2.4 8.8h19.2M2.4 15.2h19.2"
        stroke={color}
        strokeWidth={DEFAULT_STROKE_WIDTH}
      />
    </Svg>
  );
};
