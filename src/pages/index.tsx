import type {ReactNode, PointerEvent as ReactPointerEvent} from 'react';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {motion} from 'motion/react';
import GiscusComments from '@site/src/components/Giscus';
import RecentDiscussions from '@site/src/components/RecentDiscussions';
import {useGlowHandlers} from '@site/src/components/useGlowHandlers';

import styles from './index.module.css';

const ORG_REPO = 'https://github.com/DDTRobot';
const COMMUNITY_REPO = 'https://github.com/DDTRobot/community';

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

const CAROUSEL_INTERVAL = 4200;
const DRAG_BUFFER = 60;
const VELOCITY_THRESHOLD = 400;

function HeroCarousel() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const isEn = currentLocale === 'en';
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const justSwipedRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const count = generations.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => goTo(index + 1);

  useEffect(() => {
    if (dragging) return;
    const timer = setInterval(next, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, dragging]);

  // Distance (in stack position) forward from the active card — always
  // 0, 1, 2, ... so every card is visible and cycles to the back on swipe.
  const offsetOf = (i: number) => ((i - index) % count + count) % count;

  // Gesture recognition without any visual drag: the image never moves,
  // we just read the pointer's horizontal travel and velocity on release.
  const handlePointerDown = (e: ReactPointerEvent) => {
    startXRef.current = e.clientX;
    startTimeRef.current = e.timeStamp;
    setDragging(true);
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (startXRef.current === null) return;
    if (Math.abs(e.clientX - startXRef.current) > 4) {
      justSwipedRef.current = true;
    }
  };

  const handlePointerUp = (e: ReactPointerEvent) => {
    setDragging(false);
    if (startXRef.current === null) return;

    const deltaX = e.clientX - startXRef.current;
    const deltaTime = Math.max(1, e.timeStamp - startTimeRef.current);
    const velocity = (deltaX / deltaTime) * 1000; // px/s

    const swipeLeft = deltaX < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD;
    const swipeRight = deltaX > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD;

    if (swipeLeft) next();
    else if (swipeRight) goTo(index - 1);

    startXRef.current = null;
    // Keep the "just swiped" flag alive briefly so the trailing click
    // (fired right after pointerup) is still suppressed, then clear it.
    setTimeout(() => {
      justSwipedRef.current = false;
    }, 200);
  };

  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroStack}>
        {generations.map((g, i) => {
          const offset = offsetOf(i);
          const isActive = offset === 0;
          const href = isEn && g.hrefEn ? g.hrefEn : g.href;

          return (
            <motion.div
              key={g.name}
              className={styles.heroStackCard}
              style={{zIndex: count - offset}}
              onPointerDown={isActive ? handlePointerDown : undefined}
              onPointerMove={isActive ? handlePointerMove : undefined}
              onPointerUp={isActive ? handlePointerUp : undefined}
              animate={{
                x: offset === 0 ? 0 : offset * 18,
                y: offset * 14,
                scale: 1 - offset * 0.06,
                opacity: offset === 0 ? 1 : 0.55 - offset * 0.15,
              }}
              transition={{duration: 0.45, ease: [0.22, 1, 0.36, 1]}}
              whileTap={isActive ? {cursor: 'grabbing'} : undefined}>
              {isActive ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  className={styles.heroImageFrame}
                  aria-label={g.name}
                  onClick={(e) => {
                    if (justSwipedRef.current) e.preventDefault();
                  }}>
                  <img
                    src={g.image}
                    alt={g.name}
                    className={styles.heroImage}
                    loading="eager"
                    draggable={false}
                  />
                  <div className={styles.heroImageOverlay} />
                  <div className={styles.heroBadge}>
                    <span className={styles.heroBadgeDot} />
                    {g.name}
                  </div>
                  <div className={styles.heroCorner} aria-hidden />
                </a>
              ) : (
                <div className={styles.heroImageFrame} aria-hidden>
                  <img
                    src={g.image}
                    alt=""
                    className={styles.heroImage}
                    loading="lazy"
                    draggable={false}
                  />
                  <div className={styles.heroImageOverlay} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className={styles.heroDots} role="tablist">
        {generations.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={g.name}
            className={clsx(styles.heroDot, i === index && styles.heroDotActive)}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

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

        <HeroCarousel />
      </div>
    </header>
  );
}

function Generations() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const isEn = currentLocale === 'en';
  const {onMouseMove, onMouseLeave} = useGlowHandlers();
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
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className={clsx(styles.genCard, 'glow-card')}>
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
  const {onMouseMove, onMouseLeave} = useGlowHandlers();
  return (
    <Link
      to={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={clsx(styles.card, 'glow-card', span === 'wide' && styles.cardWide)}>
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
