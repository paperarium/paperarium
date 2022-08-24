import Hamburger from "hamburger-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink/NavLink";
import NavMenu from "../NavMenu/NavMenu";
import { Auth } from '@aws-amplify/auth';
import { RiScissorsCutLine } from "react-icons/ri";
import s from "./NavBar.module.scss";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from "next/router";

const NavBar: React.FC = function NavBar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useAuthenticator((context) => [context.user]);
  // const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <>
      <NavMenu toggled={navOpen} />
      <nav className={s.container}>
        <Link href="/" passHref>
          <a className={s.title_container}>
            <RiScissorsCutLine />
            {/* <Image src={LOGOTEXT} layout="fill" objectFit="contain" /> */}
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
