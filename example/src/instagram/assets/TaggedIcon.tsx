import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import {
  DEFAULT_BACKGROUND,
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  type IconProps,
} from './icon';

const CARD =
  'M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z';
const SHOULDERS_OUTLINE =
  'M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.95 3.95 0 005.546 21.4v.603';
const SHOULDERS_FILLED = `${SHOULDERS_OUTLINE}z`;

export const TaggedIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  backgroundColor = DEFAULT_BACKGROUND,
  filled = false,
  ...props
}: IconProps) => {
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d={CARD} fill={color} />
        <Path d={SHOULDERS_FILLED} fill={backgroundColor} />
        <Circle cx={12.072} cy={11.075} r={3.556} fill={backgroundColor} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d={CARD}
        stroke={color}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={SHOULDERS_OUTLINE}
        stroke={color}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12.072}
        cy={11.075}
        r={3.556}
        stroke={color}
        strokeWidth={DEFAULT_STROKE_WIDTH}
      />
    </Svg>
  );
};
