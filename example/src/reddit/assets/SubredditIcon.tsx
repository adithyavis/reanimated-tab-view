import * as React from 'react';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';
import { SnooMark } from './Snoo';

type Glyph = 'react' | 'code' | 'bulb' | 'question' | 'chat';

type Community = {
  background: string;
  glyph?: Glyph;

  color?: string;
};

const COMMUNITIES: Record<string, Community> = {
  'r/AskReddit': { background: '#0079D3', glyph: 'chat' },
  'r/explainlikeimfive': { background: '#146B6B', glyph: 'question' },
  'r/programming': { background: '#1B1B1F', glyph: 'code' },
  'r/reactnative': { background: '#20232A', glyph: 'react' },
  'r/todayilearned': { background: '#6B4F17', glyph: 'bulb' },
  'r/webdev': { background: '#1C3A5E', glyph: 'code' },
  'r/InternetIsBeautiful': { background: '#0A7B6C' },
  'r/mildlyinteresting': { background: '#8B2C3B' },
};

const GLYPHS: Record<Glyph, (color: string) => React.ReactNode> = {
  react: (color) => (
    <G>
      <Circle cx={50} cy={50} r={9} fill={color} />
      <Ellipse
        cx={50}
        cy={50}
        rx={34}
        ry={13}
        stroke={color}
        strokeWidth={5}
        fill="none"
      />
      <Ellipse
        cx={50}
        cy={50}
        rx={34}
        ry={13}
        stroke={color}
        strokeWidth={5}
        fill="none"
        transform="rotate(60 50 50)"
      />
      <Ellipse
        cx={50}
        cy={50}
        rx={34}
        ry={13}
        stroke={color}
        strokeWidth={5}
        fill="none"
        transform="rotate(120 50 50)"
      />
    </G>
  ),
  code: (color) => (
    <Path
      d="M38 34L20 50l18 16M62 34l18 16-18 16M56 28L44 72"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  bulb: (color) => (
    <G>
      <Path
        d="M50 20a20 20 0 00-12 36v8h24v-8a20 20 0 00-12-36z"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M42 72h16M45 81h10"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </G>
  ),
  question: (color) => (
    <G>
      <Path
        d="M36 38a14 14 0 1119 13v8"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={55} cy={76} r={5.5} fill={color} />
    </G>
  ),
  chat: (color) => (
    <Path
      d="M50 24c17 0 30 11 30 24S67 72 50 72a37 37 0 01-8-1l-14 7 4-12a21 21 0 01-12-18c0-13 13-24 30-24z"
      fill={color}
    />
  ),
};

type SubredditIconProps = {
  subreddit: string;
  size?: number;
};

export const SubredditIcon = React.memo<SubredditIconProps>(
  function SubredditIcon({ subreddit, size = 20 }) {
    const community = COMMUNITIES[subreddit];

    if (!community?.glyph) {
      return (
        <SnooMark
          size={size}
          background={community?.background ?? '#FF4500'}
          color={community?.color ?? '#FFFFFF'}
        />
      );
    }

    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx={50} cy={50} r={50} fill={community.background} />
        {GLYPHS[community.glyph]('#FFFFFF')}
      </Svg>
    );
  }
);
