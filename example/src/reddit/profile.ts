import fourYearClub from './assets/four-year-club.png';

export const profile = {
  username: 'Curious_Otter_8823',
  handle: 'u/Curious_Otter_8823',
  followers: '46 followers',
  achievements: '18 achievements',
  postKarma: '2,914',
  commentKarma: '11,376',
} as const;

export type ProfileStat = {
  key: string;
  value: string;
  label: string;

  expandable?: boolean;

  communities?: readonly string[];
};

export const stats: readonly ProfileStat[] = [
  { key: 'karma', value: '14.2k', label: 'Karma' },
  {
    key: 'contributions',
    value: '312',
    label: 'Contributions',
    expandable: true,
  },
  { key: 'age', value: '4y', label: 'Account Age' },
  {
    key: 'active',
    value: '23',
    label: 'Active In',
    expandable: true,
    communities: ['r/AskReddit', 'r/reactnative', 'r/webdev'],
  },
];

export type Post = {
  key: string;
  subreddit: string;
  age: string;
  title: string;

  body?: string;

  quote?: string;
  imageId?: number;
  views?: string;
  score: number;
  comments: number;
  upvoted?: boolean;
};

export const posts: readonly Post[] = [
  {
    key: 'post-paint',
    subreddit: 'r/webdev',
    age: '1mo',
    title:
      'Got our first paint from 900ms to 180ms and only three changes mattered',
    quote:
      '1. Stopped shipping the icon font. Thirty-four icons became thirty-four inline SVGs and a render blocking request went away.\n\n2. Gave the hero image real width and height attributes. No more layout shift, no more waiting on JavaScript to decide what to load.\n\n3. Moved analytics off the critical path. It loads after the first interaction now and nobody has noticed.',
    score: 1284,
    comments: 143,
  },
  {
    key: 'post-lists',
    subreddit: 'r/reactnative',
    age: '2mo',
    title:
      'After three years of React Native, the list decision tree I wish someone had handed me on day one',
    body: 'Short version: FlatList until you measure a problem, FlashList when rows are uniform enough to estimate, and a windowed ScrollView when the list is under about forty items and you want the header to behave.',
    score: 842,
    comments: 97,
  },
  {
    key: 'post-staircase',
    subreddit: 'r/mildlyinteresting',
    age: '3mo',
    title: 'The wear pattern on a 400-year-old stone staircase',
    imageId: 1005,
    score: 21400,
    comments: 386,
  },
  {
    key: 'post-bread',
    subreddit: 'r/explainlikeimfive',
    age: '4mo',
    title:
      'ELI5: why does bread go stale faster in the fridge than on the counter?',
    score: 3106,
    comments: 214,
  },
  {
    key: 'post-youtube',
    subreddit: 'r/AskReddit',
    age: '5mo',
    title:
      "What's the most useful thing you've ever learned from a random YouTube video?",
    score: 9820,
    comments: 4271,
  },
  {
    key: 'post-octopus',
    subreddit: 'r/todayilearned',
    age: '6mo',
    title:
      'TIL octopuses have three hearts, and two of them stop beating while they swim, which is why they would rather crawl',
    score: 15200,
    comments: 502,
  },
];

export type Comment = {
  key: string;
  postTitle: string;
  subreddit?: string;
  age: string;
  score: number;
  body: string;
  views: string;
};

export const comments: readonly Comment[] = [
  {
    key: 'comment-hobby',
    postTitle: "What's a hobby that's surprisingly cheap to get into?",
    age: '4h',
    score: 24,
    body: 'Bread baking. Flour, salt, water, and a second hand dutch oven. The starter is free if you can talk someone into giving you a spoonful of theirs.',
    views: '1.2k views',
  },
  {
    key: 'comment-typescript',
    postTitle: 'Is it still worth learning TypeScript from scratch in 2026?',
    subreddit: 'r/webdev',
    age: '1d',
    score: 112,
    body: 'It stopped being a question the day the ecosystem started shipping types by default. You are already using it, you just are not writing it yet.',
    views: '8.4k views',
  },
  {
    key: 'comment-jank',
    postTitle: "Anyone else's list only janks on Android?",
    subreddit: 'r/reactnative',
    age: '3d',
    score: 8,
    body: 'Nine times out of ten it is a shadow on the row. Android rasterises it on every frame. Swap it for a hairline border and watch the profile go flat.',
    views: '640 views',
  },
  {
    key: 'comment-proud',
    postTitle: "What's the dumbest thing you have ever been proud of?",
    subreddit: 'r/AskReddit',
    age: '5d',
    score: 3,
    body: 'Parallel parked a van on the first try with six people watching. Nothing in my career since has come close.',
    views: '96 views',
  },
  {
    key: 'comment-cold',
    postTitle: 'ELI5: why do cold rooms make you sleep better?',
    subreddit: 'r/explainlikeimfive',
    age: '6d',
    score: 41,
    body: 'Falling asleep is downstream of your core temperature dropping. A cold room does not put you to sleep, it just gets out of the way while your body does.',
    views: '3.1k views',
  },
];

export const savedPosts: readonly Post[] = [
  {
    key: 'saved-sky',
    subreddit: 'r/InternetIsBeautiful',
    age: '7mo',
    views: '3.3k views',
    title:
      'A site that shows you what the night sky looked like from anywhere on Earth, on any date you pick',
    body: 'Put in the town you grew up in and your birthday. It is a strange feeling.',
    score: 4816,
    comments: 227,
    upvoted: true,
  },
  {
    key: 'saved-postgres',
    subreddit: 'r/programming',
    age: '9mo',
    views: '18.2k views',
    title:
      'The "just use Postgres" talk that keeps getting reposted, and why it keeps being right',
    body: 'Queue, cache, search, cron, and blob store, all in the thing you were already running. Worth a rewatch every time someone proposes a fifth datastore.',
    score: 6402,
    comments: 738,
  },
];

export type Trophy = {
  key: string;
  title: string;
  badge: number;
};

export const trophies: readonly Trophy[] = [
  { key: 'four-year', title: 'Four-Year Club', badge: fourYearClub },
];
