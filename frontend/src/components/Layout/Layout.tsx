import React from 'react';

import Footer from '../../assets/styles/Footer.css';
import Header from '../../assets/styles/Header.css';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <header className={Header.header}></header>
      <main className="main-content">{children}</main>
      <footer className={Footer.footer}></footer>
    </div>
  );
};

export default Layout;
