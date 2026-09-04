import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../theme';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  type IconProps,
} from './icon';

type StrokeIconProps = IconProps & { d: string };

const StrokeIcon = ({
  color = colors.textPrimary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  d,
  ...props
}: StrokeIconProps) => (
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

export const ChevronRightIcon = (props: IconProps) => (
  <StrokeIcon strokeWidth={2} {...props} d="M9 5l7 7-7 7" />
);

export const ChevronDownIcon = (props: IconProps) => (
  <StrokeIcon strokeWidth={2} {...props} d="M5 9l7 7 7-7" />
);

export const SearchIcon = ({
  color = colors.textPrimary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle
      cx={10.6}
      cy={10.6}
      r={7.1}
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M15.9 15.9L21 21"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const SettingsIcon = ({
  color = colors.textPrimary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={3.2} stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M19.3 13.1a7.6 7.6 0 000-2.2l2-1.5-1.9-3.3-2.4.9a7.6 7.6 0 00-1.9-1.1L14.8 3H9.2l-.3 2.9c-.7.3-1.3.6-1.9 1.1l-2.4-.9L2.7 9.4l2 1.5a7.6 7.6 0 000 2.2l-2 1.5 1.9 3.3 2.4-.9c.6.5 1.2.8 1.9 1.1l.3 2.9h5.6l.3-2.9c.7-.3 1.3-.6 1.9-1.1l2.4.9 1.9-3.3-2-1.5z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </Svg>
);

export const OverflowIcon = ({
  color = colors.textPrimary,
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={5} r={1.8} fill={color} />
    <Circle cx={12} cy={12} r={1.8} fill={color} />
    <Circle cx={12} cy={19} r={1.8} fill={color} />
  </Svg>
);

export const EyeIcon = ({
  color = colors.textSecondary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M1.8 12S5.8 5.4 12 5.4 22.2 12 22.2 12 18.2 18.6 12 18.6 1.8 12 1.8 12z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12} r={3.1} stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const EyeOffIcon = ({
  color = colors.textSecondary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9.8 5.7A9.7 9.7 0 0112 5.4c6.2 0 10.2 6.6 10.2 6.6a17 17 0 01-3 3.7M6.6 6.9A17.3 17.3 0 001.8 12S5.8 18.6 12 18.6a9.9 9.9 0 004.2-.9"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.8 9.8a3.1 3.1 0 004.4 4.4M3.5 3.5l17 17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const UpvoteIcon = (props: IconProps) => (
  <StrokeIcon {...props} d="M12 4.2l7.6 8.1h-4.3v7.5H8.7v-7.5H4.4L12 4.2z" />
);

export const DownvoteIcon = (props: IconProps) => (
  <StrokeIcon {...props} d="M12 19.8l7.6-8.1h-4.3V4.2H8.7v7.5H4.4l7.6 8.1z" />
);

export const CommentIcon = (props: IconProps) => (
  <StrokeIcon
    {...props}
    d="M21 11.4c0 4.5-4 8.1-9 8.1a10 10 0 01-3.3-.5L3.6 21l1.7-4.2a7.7 7.7 0 01-2.3-5.4c0-4.5 4-8.1 9-8.1s9 3.6 9 8.1z"
  />
);

export const RepostIcon = (props: IconProps) => (
  <StrokeIcon
    {...props}
    d="M16.8 2.8l3 3-3 3M19.8 5.8H8.4a4 4 0 00-4 4v1.2M7.2 21.2l-3-3 3-3M4.2 18.2h11.4a4 4 0 004-4V13"
  />
);

export const ShareIcon = (props: IconProps) => (
  <StrokeIcon
    {...props}
    d="M12 15.2V3.4M8.2 7.2L12 3.4l3.8 3.8M5.4 13.4v5.4a2 2 0 002 2h9.2a2 2 0 002-2v-5.4"
  />
);

export const FeedOptionsIcon = ({
  color = colors.textPrimary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3.5 7.5h11M18.5 7.5h2M3.5 16.5h4M11.5 16.5h9"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Circle
      cx={16.6}
      cy={7.5}
      r={2.3}
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Circle
      cx={9.4}
      cy={16.5}
      r={2.3}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </Svg>
);

export const PostListIcon = ({
  color = colors.textPrimary,
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3.8 5.4h16.4a1 1 0 011 1v11.2a1 1 0 01-1 1H3.8a1 1 0 01-1-1V6.4a1 1 0 011-1z"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M6.2 9.2h11.6M6.2 12.5h11.6M6.2 15.8h7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const HomeIcon = (props: IconProps) => (
  <StrokeIcon
    {...props}
    d="M3.2 9.9L12 3.1l8.8 6.8v9.6a1.6 1.6 0 01-1.6 1.6H4.8a1.6 1.6 0 01-1.6-1.6V9.9z"
  />
);

export const PlusIcon = (props: IconProps) => (
  <StrokeIcon strokeWidth={2} {...props} d="M12 4.5v15M4.5 12h15" />
);

export const InboxIcon = (props: IconProps) => (
  <StrokeIcon
    {...props}
    d="M18.4 9.6a6.4 6.4 0 10-12.8 0c0 5.2-2 6.8-2 6.8h16.8s-2-1.6-2-6.8zM13.7 20a2 2 0 01-3.4 0"
  />
);
