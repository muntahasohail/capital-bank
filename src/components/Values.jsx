import React from 'react';
import valuesImage from '../assets/images/image 2.jpeg';

const valuesData = [
  {
    tag: 'You –',
    title: 'Customer Care',
    desc: 'We always put the customer and their needs front and centre.',
  },
  {
    tag: 'Your Needs –',
    title: 'Collaboration',
    desc: 'We do all we can to understand and anticipate what will help our customers find their way and achieve their ambitions.',
  },
  {
    tag: 'Your Way –',
    title: 'Creativity and Innovation',
    desc: 'We do things differently, challenging the status quo to find new and better ways to move ourselves and our customers forward.',
  },
  {
    tag: 'The Right Way –',
    title: 'Conduct and Integrity',
    desc: 'We always act with integrity and transparency in everything we do. It is the cornerstone of our business and brand.',
  },
];

const Values = () => {
  return (
    <div style={styles.wrapper}>
      <img src={valuesImage} alt="Values Background" style={styles.image} />
      <div style={styles.overlay}>

        <div style={styles.left}>
          <p style={styles.eyebrow}>Values Background</p>
          <h1 style={styles.heading}>Our<br />Values</h1>
          <div style={styles.divider} />
        </div>

        <div style={styles.grid}>
          {valuesData.map((v, i) => (
            <div key={i} style={styles.card}>
              <span style={styles.cardTag}>{v.tag}</span>
              <h3 style={styles.cardTitle}>{v.title}</h3>
              <div style={styles.cardLine} />
              <p style={styles.cardDesc}>{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    objectFit: 'cover',
    objectPosition: 'center',
    position: 'absolute',
    inset: 0,
  },
  overlay: {
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(10,20,40,0.92) 40%, rgba(10,20,40,0.75))',
    display: 'flex',
    alignItems: 'center',
    padding: '6rem 5rem',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  left: {
    flex: '0 0 220px',
    color: '#fff',
  },
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#f0c040',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  heading: {
    fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
    fontSize: '3.8rem',
    fontWeight: '800',
    lineHeight: '1.1',
    color: '#fff',
    margin: '0 0 1.2rem',
    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
  },
  divider: {
    width: '50px',
    height: '4px',
    background: 'linear-gradient(90deg, #f0c040, transparent)',
    borderRadius: '2px',
  },
  grid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    minWidth: '300px',
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(240,192,64,0.2)',
    borderRadius: '12px',
    padding: '1.8rem',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'default',
  },
  cardTag: {
    fontSize: '0.75rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#f0c040',
    fontWeight: '700',
    display: 'block',
    marginBottom: '0.5rem',
  },
  cardTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#fff',
    margin: '0 0 0.7rem',
  },
  cardLine: {
    width: '36px',
    height: '2px',
    background: '#f0c040',
    borderRadius: '2px',
    marginBottom: '0.8rem',
  },
  cardDesc: {
    fontSize: '0.92rem',
    lineHeight: '1.75',
    color: '#b0c4d8',
    margin: 0,
  },
};

export default Values;
