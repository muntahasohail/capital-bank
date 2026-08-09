import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Features from '../components/features';
import Footer from '../components/footer';

const Divider = () => (
  <div style={s.divider}>
    <div style={s.dividerInner}>
      <span style={s.line} />
      <span style={s.diamond}>◆</span>
      <span style={s.centerText}>CAPITAL BANK</span>
      <span style={s.diamond}>◆</span>
      <span style={s.line} />
    </div>
    <div style={s.dotsRow}>
      {Array.from({ length: 12 }).map((_, i) => <span key={i} style={s.dot} />)}
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <Navbar />
      <About />
      <Divider />
      <section id="features"><Features /></section>
      <Divider />
      <Footer />
    </>
  );
};

const s = {
  divider: {
    background: 'linear-gradient(180deg, #0a1628 0%, #060f1e 50%, #0a1628 100%)',
    borderTop: '1px solid rgba(240,192,64,0.2)',
    borderBottom: '1px solid rgba(240,192,64,0.2)',
    padding: '2.5rem 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dividerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '1.2rem',
  },
  line: {
    display: 'block',
    width: '120px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.6))',
  },
  diamond: {
    color: '#f0c040',
    fontSize: '0.6rem',
    opacity: 0.8,
  },
  centerText: {
    fontSize: '0.65rem',
    letterSpacing: '6px',
    textTransform: 'uppercase',
    color: 'rgba(240,192,64,0.7)',
    fontWeight: '700',
    fontFamily: 'Georgia, serif',
  },
  dotsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  dot: {
    display: 'inline-block',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(240,192,64,0.25)',
  },
};

export default Home;
