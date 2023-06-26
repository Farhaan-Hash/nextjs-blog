"use client";
import Link from "next/link";
import React, {useState} from "react";
import styles from "./navbar.module.css";
import DarkMode from "../DarkMode/DarkMode";
import {signIn, signOut, useSession} from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  const [showLinks, setShowLinks] = useState(false);

  const handleIconClick = () => {
    setShowLinks(!showLinks);
  };

  const handleLinkClick = () => {
    setShowLinks(false);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        NextBlog
      </Link>
      <div className={styles.sidebar}>
        <button
          onClick={handleIconClick}
          className={`${styles.iconButton} ${showLinks ? styles.active : ""}`}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className={`${styles.links} ${showLinks ? styles.show : ""}`}>
          <DarkMode />
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className={styles.link}
              onClick={handleLinkClick}
            >
              {link.title}
            </Link>
          ))}
          {session.status === "authenticated" ? (
            <button className={styles.logout} onClick={signOut}>
              Logout
            </button>
          ) : (
            <button className={styles.login} onClick={signIn}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
