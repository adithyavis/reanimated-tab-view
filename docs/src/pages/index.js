import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'Collapsible Headers',
    description:
      'Built-in support for collapsible headers on iOS and Android with smooth scroll synchronization across tabs.',
  },
  {
    title: 'Multiple Render Modes',
    description:
      'Choose between "all", "windowed", or "lazy" render modes to optimize performance for your use case.',
  },
  {
    title: 'Smooth Animations',
    description:
      'Powered by Reanimated 3 and Gesture Handler for buttery smooth 60fps animations and gestures.',
  },
  {
    title: 'Customizable Tab Bar',
    description:
      'Follows Material Design spec with support for dynamic tab widths, scrollable tabs, and custom tab bar rendering.',
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroText}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/installation"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className={styles.heroAnimation}>
          <img
            src="/reanimated-tab-view/img/tab-view-animation.svg"
            alt="Tab View Animation"
            width="240"
          />
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--3')}>
      <div className="padding-horiz--md padding-vert--lg">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
