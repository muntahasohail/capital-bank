import React from 'react';
import bankImage from '../assets/images/image 1.avif';

const About = () => {
  return (
    <div id="about" style={styles.wrapper}>
      <img src={bankImage} alt="Bank" style={styles.image} />
      <div style={styles.overlay}>
        <div style={styles.content}>
          <p style={styles.label}>About Capital Bank</p>
          <h1 style={styles.heading}>Leading Commercial Bank</h1>
          <div style={styles.divider} />
          <p style={styles.sub}>
            With over <span style={styles.highlight}>1,100 Branches</span> across{' '}
            <span style={styles.highlight}>240 cities</span>
          </p>
          <p style={styles.desc}>
            With an international presence in the <strong>UAE, Bangladesh, Bahrain, and Afghanistan</strong>,
            the Bank's heritage and prominence extend over{' '}
            <span style={styles.highlight}>27 successful years</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    marginTop: '80px',
    scrollMarginTop: '80px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(10,20,40,0.85) 50%, rgba(10,20,40,0.3))',
    display: 'flex',
    alignItems: 'center',
    padding: '0 6rem',
  },
  content: {
    maxWidth: '560px',
    color: '#fff',
  },
  label: {
    fontSize: '0.999rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#f0c040',
    marginBottom: '0.8rem',
    fontWeight: '600',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.2',
    margin: '0 0 1rem',
    fontFamily: 'Georgia, serif',
  },
  divider: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #f0c040, transparent)',
    borderRadius: '2px',
    marginBottom: '1.2rem',
  },
  sub: {
    fontSize: '1.333rem',
    fontWeight: '800',
    marginBottom: '1rem',
    color: '#dce8f5',
  },
  desc: {
    fontSize: '1.5rem',
    lineHeight: '1.9',
    color: '#b0c4d8',
  },
  highlight: {
    color: '#f0c040',
    fontWeight: '700',
  },
};

export default About;
