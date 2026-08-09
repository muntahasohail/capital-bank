import React from 'react';

const quickLinks = [
  'Fraud Risk Awareness', 'Notices & Circulars', 'Remittance Tracker',
  'Privacy Policy', 'Alfalah Currency Exchange', 'Schedule of Charges',
  'Key Fact Statements', 'Terms and Conditions', 'Rate Sheet',
];

const services = [
  'Contact Us', 'Women Services', 'NFLP', 'Survey',
  'Service Requests TAT', 'Account Opening Tracker', 'Consumer Awareness',
];

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.topBar} />

      <div style={styles.container}>

        {/* Brand Column */}
        <div style={styles.col}>
          <div style={styles.brand}>
            <span style={styles.brandName}>Capital Bank</span>
          </div>
          <p style={styles.address}>
            Head Office, B.A. Building,<br />
            I.I. Chundrigar Road,<br />
            Karachi-74000, Pakistan
          </p>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>✉</span>
            <a href="mailto:contactus@capitalbank.com" style={styles.contactLink}>
              contactus@capitalbank.com
            </a>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📞</span>
            <a href="tel:+922111225111" style={styles.contactLink}>
              +92 (21) 111 225 111
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.col}>
          <h4 style={styles.colHeading}>Quick Links</h4>
          <div style={styles.dividerSmall} />
          <ul style={styles.list}>
            {quickLinks.map(link => (
              <li key={link} style={styles.listItem}>
                <span style={styles.bullet}>›</span>
                <a href="#" style={styles.listLink}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div style={styles.col}>
          <h4 style={styles.colHeading}>Services</h4>
          <div style={styles.dividerSmall} />
          <ul style={styles.list}>
            {services.map(link => (
              <li key={link} style={styles.listItem}>
                <span style={styles.bullet}>›</span>
                <a href="#" style={styles.listLink}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div style={styles.col}>
          <h4 style={styles.colHeading}>Connect With Us</h4>
          <div style={styles.dividerSmall} />
          <div style={styles.socialRow}>
            {['f', 'in', 'tw', 'yt'].map((s, i) => (
              <a key={i} href="#" style={styles.socialBtn}>{s}</a>
            ))}
          </div>
          <h4 style={{ ...styles.colHeading, marginTop: '1.8rem' }}>Download App</h4>
          <div style={styles.dividerSmall} />
          <a href="#" style={styles.appBtn}>📱 —  App Store</a>
          <a href="#" style={styles.appBtn}>▶ Play Store</a>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyright}>© {new Date().getFullYear()} Bank Alfalah Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(180deg, #060f1e 0%, #020810 100%)',
    borderTop: '1px solid rgba(240,192,64,0.15)',
    color: '#8fa8c0',
    fontFamily: 'sans-serif',
  },
  topBar: {
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #f0c040, transparent)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
    gap: '3rem',
    padding: '4rem 5rem',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1.2rem',
  },
  brandIcon: {
    fontSize: '1.8rem',
  },
  brandName: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#fff',
    fontFamily: '"Palatino Linotype", Georgia, serif',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  brandAccent: {
    color: '#f0c040',
    fontStyle: 'italic',
  },
  address: {
    fontSize: '0.85rem',
    lineHeight: '1.8',
    color: '#7a95b0',
    marginBottom: '1rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.5rem',
  },
  contactIcon: {
    fontSize: '0.9rem',
    color: '#f0c040',
  },
  contactLink: {
    color: '#8fa8c0',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s',
  },
  colHeading: {
    fontSize: '0.8rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#f0c040',
    fontWeight: '700',
    margin: '0 0 0.6rem',
  },
  dividerSmall: {
    width: '30px',
    height: '2px',
    background: 'linear-gradient(90deg, #f0c040, transparent)',
    borderRadius: '2px',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  bullet: {
    color: '#f0c040',
    fontSize: '1rem',
    lineHeight: '1',
  },
  listLink: {
    color: '#7a95b0',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s',
  },
  socialRow: {
    display: 'flex',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },
  socialBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid rgba(240,192,64,0.3)',
    color: '#f0c040',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    transition: 'background 0.2s',
  },
  appBtn: {
    display: 'block',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(240,192,64,0.2)',
    borderRadius: '8px',
    padding: '10px 16px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '0.6rem',
    letterSpacing: '0.5px',
    transition: 'background 0.2s',
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '1.2rem 5rem',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '0.78rem',
    color: '#4a6070',
    margin: 0,
    letterSpacing: '0.5px',
  },
};

export default Footer;
