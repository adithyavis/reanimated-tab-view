/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['installation', 'quick-start'],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'guides/render-modes',
        'guides/jump-modes',
        {
          type: 'category',
          label: 'Tab Bar',
          collapsed: false,
          items: [
            'guides/custom-tab-bar',
            'guides/dynamic-tab-widths',
          ],
        },
        {
          type: 'category',
          label: 'Scrollable',
          collapsed: false,
          items: [
            'guides/scrollable/collapsible-headers',
            'guides/scrollable/scrollable-content',
            'guides/scrollable/refresh-control',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Components',
          collapsed: false,
          items: [
            'api/components/tab-view',
            'api/components/tab-bar',
            {
              type: 'category',
              label: 'Scrollable',
              collapsed: false,
              items: [
                'api/components/scrollable/rtv-scroll-view',
                'api/components/scrollable/rtv-flat-list',
                'api/components/scrollable/rtv-refresh-control',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Hooks',
          collapsed: false,
          items: [
            'api/hooks/use-refresh-control',
          ],
        },
        'api/types',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: false,
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/limitations',
        'troubleshooting/migration-from-tab-view',
      ],
    },
  ],
};

export default sidebars;
