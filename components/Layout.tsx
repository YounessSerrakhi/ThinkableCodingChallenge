import React, { ReactNode } from 'react';
import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title = 'Serrakhi Blog' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="A clean, minimal blog theme" />
      <meta name="author" content="SERRAKHI" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css" />
    </Head>
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;