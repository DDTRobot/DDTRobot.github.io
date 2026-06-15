import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import GiscusComments from '@site/src/components/Giscus';
import RecentDiscussions from '@site/src/components/RecentDiscussions';

import styles from './index.module.css';

const ORG_REPO = 'https://github.com/DDTRobot';
const COMMUNITY_REPO = 'https://github.com/DDTRobot/community';

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={clsx(styles.heroGrid, 'brand-grid-bg')} />
      <div className="brand-noise" />

      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroLeft}>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="hero.title.line1">本末机器人</Translate>
            <br />
            <span className={styles.heroAccent}>
              <Translate id="hero.title.line2">开发者门户</Translate>
            </span>
          </Heading>
          <p className={styles.heroLede}>
            <Translate id="hero.lede">
              本末机器人是本末科技旗下的机器人业务部门。在这里了解我们的产品，并加入开发者社区一起交流
            </Translate>
          </p>
          <div className={styles.heroActions}>
            <Link
              className="button button--primary button--lg"
              href={`${COMMUNITY_REPO}/discussions`}>
              <Translate id="hero.cta.community">进入社区 →</Translate>
            </Link>
            <Link className="button button--outline button--lg" href={ORG_REPO}>
              <Translate id="hero.cta.github">访问 GitHub</Translate>
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden>
          <div className={styles.heroImageFrame}>
            <img
              src="/img/D-INFINITE.png"
              alt="D-INFINITE"
              className={styles.heroImage}
              loading="eager"
            />
            <div className={styles.heroImageOverlay} />
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              D-INFINITE
            </div>
            <div className={styles.heroCorner} aria-hidden />
          </div>
        </div>
      </div>
    </header>
  );
}

type Generation = {
  name: string;
  image: string;
  href: string;
  hrefEn?: string;
};

const generations: Generation[] = [
  {name: 'Diablo', image: '/img/diablo.png', href: 'https://github.com/DDTRobot/diablo_ros2'},
  {name: 'TITA', image: '/img/TITA.png', href: 'https://tita-development-manual-uc.readthedocs.io/zh-cn/latest/', hrefEn: 'https://tita-ubuntu-manual-english.readthedocs.io/en/latest/'},
  {name: 'D-INFINITE', image: '/img/D-INFINITE.png', href: 'https://d1-development-manual-cn.readthedocs.io/zh-cn/latest/', hrefEn: 'https://y1.readthedocs.io/en/latest/'},
];

function Generations() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const isEn = currentLocale === 'en';
  return (
    <section className={styles.generations}>
      <div className="container">
        <div className={styles.sectionHead}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="generations.title">产品系列</Translate>
          </Heading>
        </div>

        <div className={styles.genGrid}>
          {generations.map((g) => (
            <a
              key={g.name}
              href={isEn && g.hrefEn ? g.hrefEn : g.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.genCard}>
              <div className={styles.genImageWrap}>
                <img
                  src={g.image}
                  alt={g.name}
                  className={styles.genImage}
                  loading="lazy"
                />
              </div>
              <Heading as="h3" className={styles.genName}>
                {g.name}
              </Heading>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

type Category = {
  id: string;
  titleId: string;
  titleMsg: string;
  subtitle: string;
  descId: string;
  descMsg: string;
  href: string;
  span?: 'wide';
};

const categories: Category[] = [
  {
    id: 'announcements',
    titleId: 'cat.announcements.title',
    titleMsg: '公告',
    subtitle: 'Announcements',
    descId: 'cat.announcements.desc',
    descMsg: '官方版本发布、产品更新、社区动态',
    href: `${COMMUNITY_REPO}/discussions/categories/announcements`,
    span: 'wide',
  },
  {
    id: 'qa',
    titleId: 'cat.qa.title',
    titleMsg: '问答',
    subtitle: 'Q & A',
    descId: 'cat.qa.desc',
    descMsg: '提问、解答、踩坑分享',
    href: `${COMMUNITY_REPO}/discussions/categories/q-a`,
  },
  {
    id: 'ideas',
    titleId: 'cat.ideas.title',
    titleMsg: '想法',
    subtitle: 'Ideas',
    descId: 'cat.ideas.desc',
    descMsg: '提出新功能建议与产品改进点子',
    href: `${COMMUNITY_REPO}/discussions/categories/ideas`,
  },
  {
    id: 'showandtell',
    titleId: 'cat.showandtell.title',
    titleMsg: '作品展示',
    subtitle: 'Show and tell',
    descId: 'cat.showandtell.desc',
    descMsg: '分享基于本末机器人构建的项目、案例或心得',
    href: `${COMMUNITY_REPO}/discussions/categories/show-and-tell`,
    span: 'wide',
  },
];

function CategoryCard({titleId, titleMsg, subtitle, descId, descMsg, href, span}: Omit<Category, 'id'>) {
  return (
    <Link
      to={href}
      className={clsx(styles.card, span === 'wide' && styles.cardWide)}>
      <div className={styles.cardTop}>
      </div>
      <div className={styles.cardMid}>
        <Heading as="h3" className={styles.cardTitle}>
          <Translate id={titleId}>{titleMsg}</Translate>
        </Heading>
        <span className={styles.cardSubtitle}>{subtitle}</span>
        <p className={styles.cardDesc}>
          <Translate id={descId}>{descMsg}</Translate>
        </p>
      </div>
      <div className={styles.cardFoot}>
        <span>
          <Translate id="category.card.cta">查看分类</Translate>
        </span>
        <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

function Community() {
  return (
    <section className={styles.community}>
      <div className="container">
        <div className={styles.sectionHead}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="community.title">开发者社区</Translate>
          </Heading>
          <p className={styles.sectionLede}>
            <Translate id="community.lede">
              交流托管在 GitHub Discussions，公开、可搜索、可订阅
            </Translate>
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MessageBoard() {
  return (
    <section className={styles.board}>
      <div className="container">
        <div className={styles.sectionHead}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="discussions.title">最近讨论</Translate>
          </Heading>
        </div>
        <RecentDiscussions />

        <div style={{marginTop: '5rem'}}>
          <div className={styles.sectionHead}>
            <Heading as="h2" className={styles.sectionTitle}>
              <Translate id="board.title">留言板</Translate>
            </Heading>
            <p className={styles.sectionLede}>
              <Translate id="board.lede">
                有什么想说的？在这里直接留言，内容会同步到 GitHub Discussions
              </Translate>
            </p>
          </div>
          <div className={styles.boardInner}>
            <GiscusComments />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({id: 'page.title', message: '本末机器人 — 开发者门户'})}
      description={translate({id: 'page.desc', message: '本末机器人是本末科技旗下的机器人业务部门。本站展示产品系列并提供开发者社区入口。'})}>
      <Hero />
      <main>
        <Generations />
        <Community />
        <MessageBoard />
      </main>
    </Layout>
  );
}
