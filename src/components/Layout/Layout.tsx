/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 the nobot space, 
 */
import React from 'react';
import NavBar from '../NavBar/NavBar';
import s from "./Layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = function Layout({ children }) {
  return (
    <>
      <main className={s.main}>
        <NavBar />
        {/* <Cursor /> */}
        {children}
      </main>
      <footer className={s.footer}>
        <a
          href="https://evankirkiles.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          designed by evan kirkiles
        </a>
      </footer>
    </>
  );
}

export default Layout;