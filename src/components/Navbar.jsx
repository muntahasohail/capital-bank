import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/login') return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (link) => {
    setActive(link);
    setMenuOpen(false);
    if (location.pathname !== '/' && location.pathname !== '/home') {
      navigate('/');
      setTimeout(() => {
        if (link === 'About') scrollTo('about');
        else if (link === 'Features') scrollTo('features');
      }, 100);
    } else {
      if (link === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else if (link === 'About') scrollTo('about');
      else if (link === 'Features') scrollTo('features');
    }
  };

  const links = ['Home', 'About', 'Features'];

  return (
    <nav className="site-nav" style={styles.nav}>
      <div className="site-nav-brand" style={styles.brand} onClick={() => handleNavClick('Home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNavClick('Home')}>
        <span style={styles.brandName}>
          Capital Bank
          <span style={styles.brandTag}>SINCE 1997</span>
        </span>
      </div>

      <button className="site-nav-toggle" style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>☰</button>

      <ul className={`site-nav-links ${menuOpen ? 'site-nav-links-open' : ''}`} style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}>
        {links.map(link => (
          <li key={link} style={styles.li}>
            <a
              className="site-nav-link"
              href="#"
              style={{ ...styles.link, ...(active === link ? styles.activeLink : {}) }}
              onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
            >
              {link}
              {active === link && <span style={styles.underline} />}
            </a>
          </li>
        ))}
        <li style={styles.li}>
          <Link className="site-nav-login" to="/login" style={styles.loginBtn} onClick={() => setActive('Login')}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(1.1rem, 5vw, 4.5rem)',
    height: '80px',
    background: 'rgba(7,17,31,0.82)',
    backdropFilter: 'blur(18px)',
    borderBottom: '1px solid rgba(240,192,64,0.15)',
    boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexWrap: 'wrap',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logo: {
    fontSize: '2rem',
    filter: 'drop-shadow(0 0 6px rgba(240,192,64,0.5))',
  },
  brandName: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1',
    fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
    fontSize: '1.12rem',
    fontStyle: 'italic',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    textShadow: '0 2px 10px rgba(0,0,0,0.4)',
  },
  brandAccent: {
    color: '#f0c040',
    fontStyle: 'italic',
  },
  brandTag: {
    fontSize: '0.62rem',
    letterSpacing: '3px',
    color: 'rgba(217,174,85,0.8)',
    fontWeight: '600',
    fontStyle: 'normal',
    marginTop: '3px',
    fontFamily: 'sans-serif',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(1rem, 3vw, 2.5rem)',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  linksOpen: {
    flexDirection: 'column',
    width: '100%',
    padding: '1rem 0',
    gap: '1.2rem',
  },
  li: {
    position: 'relative',
  },
  link: {
    color: '#b8c8d8',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: '600',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    padding: '4px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'color 0.2s',
  },
  activeLink: {
    color: '#f0c040',
    textShadow: '0 0 12px rgba(240,192,64,0.5)',
  },
  underline: {
    display: 'block',
    height: '2px',
    width: '100%',
    background: 'linear-gradient(90deg, #f0c040, transparent)',
    borderRadius: '2px',
    marginTop: '4px',
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #efd080, #c28b2e)',
    color: '#091421',
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '1rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    boxShadow: '0 8px 22px rgba(217,174,85,0.24)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.6rem',
    cursor: 'pointer',
  },
};

export default Navbar;
