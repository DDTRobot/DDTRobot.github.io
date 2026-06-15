import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const ORG = 'DDTRobot';
const SITE_REPO = 'DDTRobot.github.io';
const COMMUNITY_REPO = 'community';

const config: Config = {
  title: '本末机器人',
  tagline: '本末科技机器人业务',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: `https://${ORG.toLowerCase()}.github.io`,
  baseUrl: '/',

  organizationName: ORG,
  projectName: SITE_REPO,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {label: '简体中文'},
      en: {label: 'English'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '本末机器人',
      logo: {
        alt: '本末机器人 Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: `https://github.com/${ORG}/${COMMUNITY_REPO}/discussions`,
          label: '社区',
          position: 'left',
        },
        {
          href: `https://github.com/${ORG}`,
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '社区',
          items: [
            {
              label: '讨论区',
              href: `https://github.com/${ORG}/${COMMUNITY_REPO}/discussions`,
            },
            {
              label: '提问',
              href: `https://github.com/${ORG}/${COMMUNITY_REPO}/discussions/categories/q-a`,
            },
            {
              label: '想法征集',
              href: `https://github.com/${ORG}/${COMMUNITY_REPO}/discussions/categories/ideas`,
            },
          ],
        },
        {
          title: '更多',
          items: [
            {label: 'GitHub', href: `https://github.com/${ORG}`},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 本末机器人. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
