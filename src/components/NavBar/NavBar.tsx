import Hamburger from "hamburger-react";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "../NavLink/NavLink";
import NavMenu from "../NavMenu/NavMenu";
import { RiScissorsCutLine } from "react-icons/ri";
import s from "./NavBar.module.scss";
import { useRouter } from "next/router";
import { useUser } from '@supabase/auth-helpers-react';

const NavBar: React.FC = function NavBar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <NavMenu toggled={navOpen} setToggled={setNavOpen} />
      <nav className={s.container}>
        <Link href="/" passHref>
          <a className={s.title_container} onClick={() => setNavOpen(false)}>
            <RiScissorsCutLine />
            <span>papercraft place!</span>
          </a>
        </Link>
        <div className={s.links_container}>
          <NavLink href={"/catalog"}>catalog</NavLink>
          <NavLink href={"/howto"}>guides</NavLink>
          <NavLink href={"/about"}>history</NavLink>
        </div>
        <div className={s.spacer}></div>
        <div className={s.menu} onClick={() => setNavOpen(!navOpen)}>
          <div className={s.menu_text}>{navOpen ? "CLOSE" : "MENU"}</div>
          <Hamburger size={20} toggled={navOpen} toggle={setNavOpen} />
        </div>
        <div className={s.profile_buttons}>
          {user ? (
            <>
            <Link href={`/upload`}>
              <div className={s.login_button}>
                <a>upload</a>
              </div>
            </Link>
            <Link href={"/profile"}>
              <div className={s.profile_container}>
                <div className={s.profile_picture}>
                </div>
              </div>
            </Link>
            </>
          ) : (
            <>
              <Link href={`/login?redirect=${encodeURI(router.asPath)}`}>
                <div className={s.login_button}>
                  <a>login</a>
                </div>
              </Link>
              or
              <Link href={`/login?redirect=${encodeURI(router.asPath)}`}>
                <div className={s.login_button}>
                  <a>sign up</a>
                </div>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
