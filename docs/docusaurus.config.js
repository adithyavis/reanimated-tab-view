// @ts-check
import { createRequire } from 'module';
import { themes as prismThemes } from 'prism-react-renderer';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Reanimated Tab View',
  tagline: 'A performant tab view for React Native powered by Reanimated',
  favicon: 'img/logo.svg',

  url: 'https://adithyavis.github.io',
  baseUrl: '/reanimated-tab-view/',
  organizationName: 'adithyavis',
  projectName: 'reanimated-tab-view',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/adithyavis/reanimated-tab-view/tree/main/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: version,
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Reanimated Tab View',
        logo: {
          alt: 'Reanimated Tab View Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/adithyavis/reanimated-tab-view',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/installation',
              },
              {
                label: 'API Reference',
                to: '/docs/api/components/tab-view',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/adithyavis/reanimated-tab-view',
              },
              {
                label: 'npm',
                href: 'https://www.npmjs.com/package/reanimated-tab-view',
              },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} Adithya Viswa. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
    }),
};

export default config;
