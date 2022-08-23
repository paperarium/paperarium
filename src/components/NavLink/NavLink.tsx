/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Aug 15 2022
 * 2022 the nobot space, 
 */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import s from "./NavLink.module.scss";

type NavLinkProps = {
  href: string;
  exact?: boolean;
  children?: React.ReactNode;
  alternate?: boolean;
};

const NavLink: React.FC<NavLinkProps> = function NavLink({
  href,
  exact,
  children,
  alternate
}) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href}>
      <a className={`${alternate ? s.nav_link_alt : s.nav_link} ${isActive ? 'active' : ''}`}>{children}</a>
    </Link>
  );
};

export default NavLink;
