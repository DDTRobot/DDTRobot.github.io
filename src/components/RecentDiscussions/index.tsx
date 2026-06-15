import React, {useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Discussion = {
  number: number;
  title: string;
  html_url: string;
  comments: number;
  created_at: string;
  user: {login: string; avatar_url: string};
  category?: {name: string; emoji?: string};
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min} 分钟前`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} 小时前`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} 天前`;
  return `${Math.floor(d / 30)} 个月前`;
}

function DiscussionListInner() {
  const [items, setItems] = useState<Discussion[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    fetch(
      'https://api.github.com/repos/DDTRobot/community/discussions?per_page=5&sort=updated',
      {headers: {Accept: 'application/vnd.github+json'}},
    )
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((data: Discussion[]) => {
        setItems(
          data.filter(
            (d: any) =>
              d.state === 'open' && d.category?.name !== 'Comments',
          ),
        );
        setStatus('ok');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') {
    return (
      <div className={styles.list}>
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (status === 'error' || items.length === 0) {
    return (
      <div className={styles.empty}>
        <Link href="https://github.com/DDTRobot/community/discussions">
          前往 GitHub Discussions 查看 →
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((d) => (
        <a
          key={d.number}
          href={d.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.row}>
          <img
            src={d.user.avatar_url}
            alt={d.user.login}
            className={styles.avatar}
            loading="lazy"
          />
          <div className={styles.body}>
            <span className={styles.title}>{d.title}</span>
            <span className={styles.meta}>
              {d.user.login}
              {d.category?.name && (
                <span className={styles.tag}>{d.category.name}</span>
              )}
              <span className={styles.dot}>·</span>
              {timeAgo(d.created_at)}
            </span>
          </div>
          <div className={styles.right}>
            <span className={styles.comments}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Z" />
              </svg>
              {d.comments}
            </span>
          </div>
        </a>
      ))}
      <a
        href="https://github.com/DDTRobot/community/discussions"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewAll}>
        查看全部讨论 →
      </a>
    </div>
  );
}

export default function RecentDiscussions(): React.ReactElement {
  return (
    <BrowserOnly fallback={<div className={styles.empty}>加载中…</div>}>
      {() => <DiscussionListInner />}
    </BrowserOnly>
  );
}
