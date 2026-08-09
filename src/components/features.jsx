import React from 'react';
import bankImage from '../assets/images/image 2.jpeg';

const values = [
  {
    emoji: '🤝',
    tag: 'You –',
    title: 'Customer Care',
    desc: 'We always put the customer and their needs front and centre.',
  },
  {
    emoji: '💡',
    tag: 'Your Needs –',
    title: 'Collaboration',
    desc: 'We do all we can to understand and anticipate what will help our customers find their way and achieve their ambitions.',
  },
  {
    emoji: '🚀',
    tag: 'Your Way –',
    title: 'Creativity and Innovation',
    desc: 'We do things differently, challenging the status quo to find new and better ways to move ourselves and our customers forward.',
  },
  {
    emoji: '⚖️',
    tag: 'The Right Way –',
    title: 'Conduct and Integrity',
    desc: 'We always act with integrity and transparency in everything we do. It is the cornerstone of our business and brand.',
  },
];

const Features = () => {
  return (
    <div id="features" style={styles.wrapper}>
      {/* Spacer + Heading Banner */}
      <div style={styles.headingBanner}>
        <p style={styles.bannerLabel}>Explore What We Offer</p>
        <h2 style={styles.bannerHeading}>
          <span style={styles.bannerThin}>Our </span>
          <span style={styles.bannerBold}>Features</span>
        </h2>
        <div style={styles.bannerDivider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerDiamond}>◆</span>
          <span style={styles.dividerLine} />
        </div>
      </div>

    <section style={styles.section}>
      {/* Left: Image */}
      <div style={styles.imageCol}>
        <img src={bankImage} alt="Our Values" style={styles.image} />
        <div style={styles.imageOverlay}>
          <p style={styles.overlayLabel}>Values Background</p>
          <h2 style={styles.overlayHeading}>Our<br />Values</h2>
          <div style={styles.overlayDivider} />
        </div>
      </div>

      {/* Right: Cards */}
      <div style={styles.cardsCol}>
        <p style={styles.sectionLabel}>What We Stand For</p>
        <h2 style={styles.sectionHeading}>Our Core Values</h2>
        <div style={styles.grid}>
          {values.map((v, i) => (
            <div key={i} style={styles.card}>
              <span style={styles.emoji}>{v.emoji}</span>
              <p style={styles.tag}>{v.tag}</p>
              <h3 style={styles.cardTitle}>{v.title}</h3>
              <p style={styles.cardDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

const styles = {
  wrapper: {
    background: '#060f1e',
  },
  headingBanner: {
    textAlign: 'center',
    padding: '5rem 2rem 3rem',
    background: 'linear-gradient(180deg, #0a1628 0%, #060f1e 100%)',
    borderTop: '1px solid rgba(240,192,64,0.1)',
  },
  bannerLabel: {
    fontSize: '0.75rem',
    letterSpacing: '5px',
    textTransform: 'uppercase',
    color: '#f0c040',
    fontWeight: '600',
    marginBottom: '0.8rem',
  },
  bannerHeading: {
    fontSize: '4rem',
    margin: '0 0 1.2rem',
    fontFamily: '"Palatino Linotype", Georgia, serif',
    lineHeight: '1',
  },
  bannerThin: {
    color: 'rgba(255,255,255,0.35)',
    fontWeight: '300',
    fontStyle: 'italic',
  },
  bannerBold: {
    color: '#ffffff',
    fontWeight: '900',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    WebkitTextStroke: '1px rgba(240,192,64,0.4)',
  },
  bannerDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  dividerLine: {
    display: 'block',
    width: '80px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #f0c040)',
  },
  dividerDiamond: {
    color: '#f0c040',
    fontSize: '0.7rem',
  },
  section: {
    display: 'flex',
    minHeight: '100vh',
    background: '#060f1e',
  },
  imageCol: {
    flex: '0 0 45%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(6,15,30,0.9) 30%, rgba(6,15,30,0.3))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '3rem',
  },
  overlayLabel: {
    fontSize: '0.99rem',
fontFamily: 'poppins, sans-serif',
    fontStyle: 'italic',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#f0c040',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  overlayHeading: {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: '#fff',
    fontFamily: '"Palatino Linotype", Georgia, serif',
    lineHeight: '1.1',
      marginBottom: '1rem',
    // margin: '0 0 1rem',
  },
  overlayDivider: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #f0c040, transparent)',
    borderRadius: '2px',
  },
  cardsCol: {
    flex: 1,
    padding: '5rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflowY: 'auto',
  },
  sectionLabel: {
    fontSize: '0.75rem',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#f0c040',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#fff',
    fontFamily: '"Palatino Linotype", Georgia, serif',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.2rem',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(240,192,64,0.15)',
    borderRadius: '16px',
    padding: '1.5rem',
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'default',
  },
  emoji: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '0.6rem',
  },
  tag: {
    fontSize: '0.72rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#f0c040',
    fontWeight: '700',
    margin: '0 0 0.3rem',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 0.6rem',
    fontFamily: 'Georgia, serif',
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: '#8fa8c0',
    lineHeight: '1.7',
    margin: 0,
  },
};

export default Features;
