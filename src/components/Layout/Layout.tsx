/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 the nobot space,
 */
import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
  hideFooter?: boolean;
  footerMarginLeft?: string;
};

const Layout: React.FC<LayoutProps> = function Layout({
  children,
  hideFooter,
  footerMarginLeft,
}) {
  return (
    <>
      <main className={s.main}>
        <NavBar />
        {/* <Cursor /> */}
        {children}
      </main>
      {!hideFooter ? <Footer marginLeft={footerMarginLeft} /> : null}
    </>
  );
};

export default Layout;
