export const profile = {
  username: 'atlas.frames',
  displayName: 'Atlas Frames',
  bio: 'Since 2016: Fujifilm X-T5',
  threadsHandle: 'atlas.frames',
  avatarId: 1074,
  notePrompt: 'Start your first note...',
  stats: [
    { value: '248', label: 'posts' },
    { value: '12.4K', label: 'followers' },
    { value: '389', label: 'following' },
  ],
} as const;

const POST_PHOTO_IDS = [
  1069, 1080, 274, 1016, 1024, 195, 1074, 232, 1015, 306, 237, 1039, 152, 331,
  164, 1025, 175, 1043, 200, 137, 250, 1050, 292, 334, 111, 1053, 106, 315,
  1035, 312, 1057, 110, 1044, 206, 1018, 129, 102, 349, 112, 1084, 257, 239,
];

const REEL_PHOTO_IDS = [
  1069, 1024, 274, 1039, 195, 1074, 306, 1016, 232, 1015, 331, 1035, 237, 1053,
  334, 1050, 152, 1044, 315, 1057, 137, 1043, 200, 349,
];

const TAGGED_PHOTO_IDS = [
  1025, 292, 102, 129, 312, 110, 206, 1018, 257, 112, 239, 1084, 175, 250, 164,
  106, 1080, 1069, 111, 1015, 349, 1057, 152, 337,
];

export type MediaBadge = 'carousel' | 'video';

export type MediaItem = {
  key: string;
  uri: string;
  badge?: MediaBadge;
  views?: string;
};

const photoUri = (id: number, width: number, height: number) =>
  `https://picsum.photos/id/${id}/${width}/${height}`;

const buildGridItems = (
  prefix: string,
  photoIds: number[],
  count: number
): MediaItem[] =>
  Array.from({ length: count }, (_, index) => {
    const photoId = photoIds[index % photoIds.length] as number;
    let badge: MediaBadge | undefined;
    if (index % 4 === 1) {
      badge = 'carousel';
    } else if (index % 7 === 3) {
      badge = 'video';
    }
    return {
      key: `${prefix}-${index}`,
      uri: photoUri(photoId, 300, 400),
      badge,
    };
  });

export const posts = buildGridItems('post', POST_PHOTO_IDS, 96);

export const tagged = buildGridItems('tagged', TAGGED_PHOTO_IDS, 48);

const VIEW_COUNTS = [
  '1.2M',
  '842K',
  '96.4K',
  '12.8K',
  '340K',
  '5,182',
  '2.1M',
  '78.9K',
  '19.3K',
  '461K',
  '8,904',
  '132K',
];

export const reels: MediaItem[] = REEL_PHOTO_IDS.map((photoId, index) => ({
  key: `reel-${index}`,
  uri: photoUri(photoId, 270, 480),
  views: VIEW_COUNTS[index % VIEW_COUNTS.length] as string,
}));

const parseViews = (views: string) => {
  const amount = Number.parseFloat(views.replace(/,/g, ''));
  if (views.endsWith('M')) {
    return amount * 1e6;
  }
  if (views.endsWith('K')) {
    return amount * 1e3;
  }
  return amount;
};

export const reelsByViews: MediaItem[] = [...reels].sort(
  (a, b) => parseViews(b.views as string) - parseViews(a.views as string)
);
