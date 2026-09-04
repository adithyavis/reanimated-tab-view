import * as React from 'react';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

type SnooBodyProps = {
  color: string;

  cutout: string;

  antenna: string;
};

const SnooBody = ({ color, cutout, antenna }: SnooBodyProps) => (
  <G>
    <Path
      d="M50 34V19"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      fill="none"
    />
    <Circle cx={50} cy={14} r={7.5} fill={antenna} />
    <Ellipse cx={17} cy={62} rx={9.5} ry={12.5} fill={color} />
    <Ellipse cx={83} cy={62} rx={9.5} ry={12.5} fill={color} />
    <Ellipse cx={50} cy={62} rx={32} ry={28} fill={color} />
    <Ellipse cx={37} cy={59} rx={6.4} ry={7} fill={cutout} />
    <Ellipse cx={63} cy={59} rx={6.4} ry={7} fill={cutout} />
    <Path
      d="M36 73c4 5.5 24 5.5 28 0"
      stroke={cutout}
      strokeWidth={4.6}
      strokeLinecap="round"
      fill="none"
    />
  </G>
);

type SnooMarkProps = {
  size?: number;
  color?: string;
  background?: string;
};

export const SnooMark = ({
  size = 20,
  color = '#FFFFFF',
  background = '#FF4500',
}: SnooMarkProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle cx={50} cy={50} r={50} fill={background} />
    <G transform="translate(50 56) scale(0.78) translate(-50 -50)">
      <SnooBody color={color} cutout={background} antenna={color} />
    </G>
  </Svg>
);
