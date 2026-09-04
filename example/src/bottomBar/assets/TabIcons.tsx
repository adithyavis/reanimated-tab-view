import * as React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  type IconProps,
} from './icon';

export const TodayIcon = ({
  color = '#FFFFFF',
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M4.5 6v12"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinecap="round"
    />
    <Rect
      x={7.5}
      y={4.5}
      width={13}
      height={15}
      rx={2.5}
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
    />
    <Rect x={10} y={7.5} width={5} height={4} rx={1} fill={color} />
    <Rect x={16.5} y={7.5} width={1.8} height={1.6} rx={0.8} fill={color} />
    <Rect x={16.5} y={10} width={1.8} height={1.6} rx={0.8} fill={color} />
    <Rect x={10} y={13.5} width={8.3} height={1.6} rx={0.8} fill={color} />
    <Rect x={10} y={16} width={5.5} height={1.6} rx={0.8} fill={color} />
  </Svg>
);

export const GamesIcon = ({
  color = '#FFFFFF',
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8.2 7h7.6a4.2 4.2 0 0 1 4.1 3.3l1 4.6A2.6 2.6 0 0 1 18.4 18c-.8 0-1.5-.4-2-1l-.8-1.1a1.6 1.6 0 0 0-1.3-.6H9.7c-.5 0-1 .2-1.3.6L7.6 17c-.5.6-1.2 1-2 1a2.6 2.6 0 0 1-2.5-3.1l1-4.6A4.2 4.2 0 0 1 8.2 7z"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinejoin="round"
    />
    <Rect x={6.4} y={11.1} width={4.2} height={1.5} rx={0.75} fill={color} />
    <Rect x={7.75} y={9.75} width={1.5} height={4.2} rx={0.75} fill={color} />
    <Circle cx={15.4} cy={11} r={1.05} fill={color} />
    <Circle cx={17.4} cy={13} r={1.05} fill={color} />
  </Svg>
);

export const AppsIcon = ({
  color = '#FFFFFF',
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M12 2.8 2.4 7.4 12 12l9.6-4.6L12 2.8z" fill={color} />
    <Path
      d="M4.9 10.7 2.4 11.9 12 16.5l9.6-4.6-2.5-1.2L12 14.1l-7.1-3.4z"
      fill={color}
    />
    <Path
      d="M4.9 15.2 2.4 16.4 12 21l9.6-4.6-2.5-1.2L12 18.6l-7.1-3.4z"
      fill={color}
    />
  </Svg>
);

export const ArcadeIcon = ({
  color = '#FFFFFF',
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={2.5}
      y={6.5}
      width={19}
      height={11}
      rx={3}
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
    />
    <Path
      d="M8.2 15V11"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinecap="round"
    />
    <Circle cx={8.2} cy={9.7} r={1.7} fill={color} />
    <Circle cx={14} cy={10.4} r={1.05} fill={color} />
    <Circle cx={17.2} cy={10.4} r={1.05} fill={color} />
    <Circle cx={14} cy={13.6} r={1.05} fill={color} />
    <Circle cx={17.2} cy={13.6} r={1.05} fill={color} />
  </Svg>
);

export const SearchIcon = ({
  color = '#FFFFFF',
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle
      cx={11}
      cy={11}
      r={7}
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
    />
    <Path
      d="M16.3 16.3 21 21"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinecap="round"
    />
  </Svg>
);
