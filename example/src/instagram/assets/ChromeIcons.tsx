import * as React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  type BaseIconProps,
} from './icon';

type StrokeIconProps = BaseIconProps & { strokeWidth?: number };

const StrokeIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  d,
  ...props
}: StrokeIconProps & { d: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlusIcon = (props: StrokeIconProps) => (
  <StrokeIcon {...props} d="M12 3.5v17M3.5 12h17" />
);

export const ChevronDownIcon = (props: StrokeIconProps) => (
  <StrokeIcon strokeWidth={2.2} {...props} d="M4.5 8.5L12 16l7.5-7.5" />
);

export const MenuIcon = (props: StrokeIconProps) => (
  <StrokeIcon strokeWidth={2} {...props} d="M3 6h18M3 12h18M3 18h18" />
);

export const HomeIcon = (props: StrokeIconProps) => (
  <StrokeIcon
    {...props}
    d="M3 9.6L12 2.5l9 7.1v10.2a1.8 1.8 0 01-1.8 1.8H4.8A1.8 1.8 0 013 20V9.6z"
  />
);

export const SendIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  ...props
}: StrokeIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21.75 2.25L10.5 13.5"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinecap="round"
    />
    <Path
      d="M21.75 2.25l-7.05 19.5-4.2-8.25L2.25 9.3l19.5-7.05z"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  ...props
}: StrokeIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle
      cx={10.5}
      cy={10.5}
      r={7.6}
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
    />
    <Path
      d="M16.4 16.4L21.3 21.3"
      stroke={color}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinecap="round"
    />
  </Svg>
);

export const CheckIcon = (props: StrokeIconProps) => (
  <StrokeIcon strokeWidth={2.2} {...props} d="M4.5 12.5l5 5 10-11" />
);

export const LockIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  ...props
}: BaseIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M7.8 10.4V7.2a4.2 4.2 0 118.4 0v3.2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Rect x={4.6} y={10} width={14.8} height={11.4} rx={2.6} fill={color} />
  </Svg>
);

export const PlayIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  ...props
}: BaseIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Path d="M7.5 4.8L19 12 7.5 19.2z" fill={color} />
  </Svg>
);

export const CarouselIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  ...props
}: BaseIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.5 3H6.4A3.4 3.4 0 003 6.4v11.1"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Rect x={6.4} y={6.4} width={14.6} height={14.6} rx={3.4} fill={color} />
  </Svg>
);

const THREADS_GLYPH =
  'M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.801 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.022 9.60668 125.163 0.195148 97.0695 0H96.9569C68.9204 0.19447 47.3057 9.6418 32.7268 28.0793C19.7538 44.4864 13.0617 67.3157 12.8331 95.9325L12.833 96L12.8331 96.0675C13.0617 124.684 19.7538 147.514 32.7268 163.921C47.3057 182.358 68.9204 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.4681 104.871 98.4681C111.106 98.4681 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z';

export const ThreadsIcon = ({
  color = '#fff',
  size = DEFAULT_ICON_SIZE,
  ...props
}: BaseIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 192 192" {...props}>
    <Path d={THREADS_GLYPH} fill={color} />
  </Svg>
);
