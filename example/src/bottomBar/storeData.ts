export type StoreApp = {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  tint: string;
  price?: string;
  note?: string;
};

export type StorySection = {
  id: string;
  title: string;
  subtitle?: string;
  apps: StoreApp[];
};

export type Story = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  artwork: string;
  app: StoreApp;
};

const APPS = {
  halide: {
    id: 'halide',
    name: 'Halide Mark III - Pro Camera',
    tagline: 'Manual controls and RAW',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/59/08/70/5908705a-685e-3114-b80a-05f95666633c/titanium-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/240x240bb.jpg',
    tint: '#1F1F22',
    note: 'In-App Purchases',
  },
  bear: {
    id: 'bear',
    name: 'Bear - Markdown Notes',
    tagline: 'Markdown notes that sync',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/3b/2d/053b2d4b-cbd3-75c1-db37-9bd85fa24ce3/AppIcon-26-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-85-220.png/240x240bb.jpg',
    tint: '#B23A48',
    note: 'In-App Purchases',
  },
  overcast: {
    id: 'overcast',
    name: 'Overcast Podcast App',
    tagline: 'Podcasts, with Smart Speed',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/da/89/10/da89109b-c19b-d4f7-a23e-c77e7c620792/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/240x240bb.jpg',
    tint: '#2B5FA8',
    note: 'In-App Purchases',
  },
  things: {
    id: 'things',
    name: 'Things 3',
    tagline: 'To-dos and plans for today',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/03/69/5d/03695db7-30fc-6af9-0fed-12f101524ca4/AppIcon-0-0-1x_U007ephone-0-0-0-1-0-0-85-220.png/240x240bb.jpg',
    tint: '#2F6FD0',
    price: '$9.99',
  },
  notion: {
    id: 'notion',
    name: 'Notion: Notes, Tasks, AI',
    tagline: 'Notes, tasks and databases',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2e/aa/40/2eaa406d-99e0-e722-530a-ce20259f3834/AppIconProd-0-0-1x_U007epad-0-0-0-1-0-0-P3-85-220.png/240x240bb.jpg',
    tint: '#2E2E2E',
    note: 'In-App Purchases',
  },
  strava: {
    id: 'strava',
    name: 'Strava: Run, Bike, Walk',
    tagline: 'Track runs and rides',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8f/52/c9/8f52c92b-01e6-5646-3bd2-7478ec19b4a5/AppIcon-Primary-0-0-1x_U007ephone-0-1-0-0-sRGB-85-220.png/240x240bb.jpg',
    tint: '#E2562A',
    note: 'In-App Purchases',
  },
  duolingo: {
    id: 'duolingo',
    name: 'Duolingo: Language Lessons',
    tagline: 'Lessons in five minute bites',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b7/b8/6b/b7b86b67-18ad-44c9-8909-f1da80444946/AppIcon-0-0-1x_U007epad-0-1-85-220.png/240x240bb.jpg',
    tint: '#3C8F3C',
    note: 'In-App Purchases',
  },
  flighty: {
    id: 'flighty',
    name: 'Flighty \u2013 Live Flight Tracker',
    tagline: 'Live flights and their delays',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c6/3b/45/c63b4559-220f-560d-efac-6ba0d5646e68/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/240x240bb.jpg',
    tint: '#1D3E6E',
    note: 'In-App Purchases',
  },
  mv3: {
    id: 'mv3',
    name: 'Monument Valley 3',
    tagline: 'Sail an impossible world',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ee/cb/18/eecb1846-3d87-5489-0078-43c13763aa1b/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/240x240bb.jpg',
    tint: '#C9705A',
  },
  alto: {
    id: 'alto',
    name: "Alto's Odyssey",
    tagline: 'Sandboard the endless desert',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/0e/09/fb/0e09fba2-1d14-006a-0486-e47fb8abd1b2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/240x240bb.jpg',
    tint: '#D08A4E',
    price: '$4.99',
  },
  stardew: {
    id: 'stardew',
    name: 'Stardew Valley',
    tagline: 'Inherit a farm, build a life',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0e/df/12/0edf1230-3f6e-fbb3-7f72-f2aa844d100a/AppIcons-0-0-1x_U007emarketing-0-8-0-85-220.png/240x240bb.jpg',
    tint: '#5E8C4A',
    price: '$4.99',
  },
  minimetro: {
    id: 'minimetro',
    name: 'Mini Metro',
    tagline: 'Draw a subway that keeps up',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/ed/56/7aed5613-8242-de14-d125-fffdaebe8c7c/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/240x240bb.jpg',
    tint: '#3B7BBF',
    price: '$3.99',
  },
  spire: {
    id: 'spire',
    name: 'Slay the Spire',
    tagline: 'One deck, one climb',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/91/0c/92/910c920a-0ab6-1939-e297-083995b640c7/AppIcon-1x_U007emarketing-0-11-0-0-85-220-0.png/240x240bb.jpg',
    tint: '#7A2E2E',
    price: '$9.99',
  },
  sky: {
    id: 'sky',
    name: 'Sky: Children of the Light',
    tagline: 'An adventure in seven realms',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/27/9f/6b/279f6bba-4092-85f0-0177-03c2f4c0433d/AppIcon-0-0-1x_U007emarketing-0-5-0-85-220.png/240x240bb.jpg',
    tint: '#4A6FA5',
    note: 'In-App Purchases',
  },
  sasquatch: {
    id: 'sasquatch',
    name: 'Sneaky Sasquatch',
    tagline: 'Sneak around the campground',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c4/17/ac/c417ac93-65e2-12bd-4321-b460299fb028/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/240x240bb.jpg',
    tint: '#4C7A3F',
    note: 'Included with Arcade',
  },
  grindstone: {
    id: 'grindstone',
    name: 'Grindstone',
    tagline: 'Puzzle battles up the mountain',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ee/6a/3c/ee6a3cc6-a4c1-f705-766a-7565cb27281e/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/240x240bb.jpg',
    tint: '#8E4B2E',
    note: 'Included with Arcade',
  },
  golf: {
    id: 'golf',
    name: 'WHAT THE GOLF?',
    tagline: 'Golf, but nothing behaves',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d8/3a/c2/d83ac202-ecb7-ae03-9ed7-c354c04024f9/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/240x240bb.jpg',
    tint: '#3F8E6E',
    note: 'Included with Arcade',
  },
} satisfies Record<string, StoreApp>;

export const today = {
  date: 'Wednesday 4 September',
  stories: [
    {
      id: 'halide',
      eyebrow: 'APP OF THE DAY',
      title: 'A camera that trusts you with the settings',
      subtitle:
        'Focus peaking, RAW files and a manual dial you can reach with one thumb. Halide hands back the controls a phone camera usually keeps to itself.',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/18/42/11/184211f5-7b1c-23bb-bfd3-be2eb600b696/5ffe57d2-d636-4b17-bbdb-bc4be089574c_55_App_Store_Screen_1.png/800x0w.jpg',
      app: APPS.halide,
    },
    {
      id: 'mv3',
      eyebrow: 'GAME OF THE DAY',
      title: 'Steer a lighthouse through impossible water',
      subtitle:
        'The third Monument Valley trades staircases for open water, and the architecture still refuses to stay where you left it.',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/d8/8c/63/d88c6316-35ae-eb4e-90dc-6dfdf2cff8b6/1_Screenshots_1284x2778_Belltower.png/800x0w.jpg',
      app: APPS.mv3,
    },
    {
      id: 'flighty',
      eyebrow: 'HOW TO',
      title: 'Know your flight is late before the airport does',
      subtitle:
        'Flighty watches the aircraft that has to land before yours can leave, which is usually the first honest sign that your evening has changed.',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b6/4c/91/b64c9185-863d-7057-a81b-6d518f4be436/Title_6.png/800x0w.jpg',
      app: APPS.flighty,
    },
  ] satisfies Story[],
};

export const gamesSections: StorySection[] = [
  {
    id: 'playing',
    title: 'What we are playing',
    subtitle: 'Short sessions, nothing to miss if you put it down.',
    apps: [APPS.alto, APPS.stardew, APPS.minimetro],
  },
  {
    id: 'worth-it',
    title: 'Worth the download',
    apps: [APPS.mv3, APPS.spire, APPS.sky],
  },
];

export const appsSections: StorySection[] = [
  {
    id: 'new',
    title: 'New apps we love',
    subtitle: 'Updated every Thursday morning.',
    apps: [APPS.halide, APPS.bear, APPS.notion],
  },
  {
    id: 'done',
    title: 'Get more done',
    apps: [APPS.things, APPS.strava, APPS.overcast, APPS.duolingo],
  },
];

export const arcade = {
  headline: 'Over 200 games. No ads, no in-app purchases.',
  subtitle: 'One subscription, up to six people, all on the family plan.',
  artwork:
    'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/65/5e/69/655e6994-1516-b33a-5f37-2ad30c37ca9d/0ee2103c-38bb-4f96-9aff-b0ac984306ba_0_APP_IPHONE_55_0.png/800x0w.jpg',
  sections: [
    {
      id: 'arcade-new',
      title: 'New this month',
      apps: [APPS.sasquatch, APPS.grindstone, APPS.golf],
    },
  ] satisfies StorySection[],
};

export const searchSuggestions = [
  'meditation timer',
  'flight tracker',
  'markdown notes',
  'couch co-op',
  'habit tracker',
  'offline maps',
];

export const searchTrending: StoreApp[] = [
  APPS.duolingo,
  APPS.strava,
  APPS.alto,
];
