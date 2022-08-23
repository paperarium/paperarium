import Hamburger from "hamburger-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink/NavLink";
import NavMenu from "../NavMenu/NavMenu";
import { Auth } from '@aws-amplify/auth';
import { RiScissorsCutLine } from "react-icons/ri";
import s from "./NavBar.module.scss";
import { useRouter } from "next/router";

const NavBar: React.FC = function NavBar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
    }).catch(() => {
      setUser(null);
    })
  }, []);
  // const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <>
      <NavMenu toggled={navOpen} />
      <nav className={s.container}>
        <Link href="/" passHref>
          <a className={s.title_container}>
            <RiScissorsCutLine />
            {/* <Image src={LOGOTEXT} layout="fill" objectFit="contain" /> */}
            <span>papercraft club!</span>
          </a>
        </Link>
        <div className={s.links_container}>
          <NavLink href={"/explore"}>explore</NavLink>
          <NavLink href={"/howto"}>how-to</NavLink>
          <NavLink href={"/about"}>about</NavLink>
        </div>
        <div className={s.spacer}></div>
        <div className={s.menu} onClick={() => setNavOpen(!navOpen)}>
          <div className={s.menu_text}>{navOpen ? "CLOSE" : "MENU"}</div>
          <Hamburger size={20} toggled={navOpen} toggle={setNavOpen} />
        </div>
        <div className={s.profile_buttons}>
          {user ? (
            <>
            <Link href={`/profile`}>
              <div className={s.login_button}>
                <a>profile</a>
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
              <div className={s.login_button}>sign up</div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
