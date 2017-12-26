import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="footer-rights">2017 POA Network. All rights reserved.</p>
      <Link to="/" className="footer-logo"></Link>
      <div className="socials">
        <a href="#" className="socials-i socials-i_reddit"></a>
        <a href="#" className="socials-i socials-i_twitter"></a>
        <a href="#" className="socials-i socials-i_oracles"></a>
        <a href="#" className="socials-i socials-i_telegram"></a>
        <a href="#" className="socials-i socials-i_github"></a>
      </div>
    </div>
  </footer>
);
