import React from 'react';
import Link from 'next/link';

const Nav: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
    <div className="container px-4 px-lg-5">
      <Link href="/" className="navbar-brand">
        Start Bootstrap
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ms-auto py-4 py-lg-0">
          <li className="nav-item">
            <Link href="/" className="nav-link px-lg-3 py-3 py-lg-4">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/post" className="nav-link px-lg-3 py-3 py-lg-4">
              Sample Post
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/contact" className="nav-link px-lg-3 py-3 py-lg-4">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Nav;