/*
 * index.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 the nobot space,
 */
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import NavLink from "../NavLink/NavLink";
import s from "./NavMenu.module.scss";

type NavMenuProps = {
  toggled?: boolean;
  setToggled: (newToggle: boolean) => void;
};

const NavMenu: React.FC<NavMenuProps> = function NavMenu({
  toggled,
  setToggled,
}) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const closeMenu = () => setToggled(false);

  return (
    <>
      <CSSTransition appear in={toggled} timeout={300} nodeRef={backdropRef}>
        <div
          className={s.nav_menu_backdrop}
          ref={backdropRef}
          onClick={closeMenu}
        ></div>
      </CSSTransition>
      <CSSTransition appear in={toggled} timeout={300} nodeRef={menuRef}>
        <div className={s.nav_menu_container} ref={menuRef}>
          <div className={s.nav_menu_content}>
            <div className={s.nav_nav_column}>
              <NavLink href={"/catalog"} onClick={closeMenu}>
                catalog
              </NavLink>
              <NavLink href={"/howto"} onClick={closeMenu}>
                guides
              </NavLink>
              <NavLink href={"/about"} onClick={closeMenu}>
                history
              </NavLink>
            </div>
            <div className={s.nav_nav_column}>
              {user ? (
                <>
                <Link href={"/profile"}>
                  <div className={s.profile_container} onClick={closeMenu}>
                    <div className={s.profile_picture}></div>
                    <div className={s.profile_name}>
                      <span className={s.user_name}>@evan</span>
                      <span>4 builds</span>
                      <span>3 papercrafts</span>
                    </div>
                  </div>
                </Link>
                  <Link href={`/upload`}>
                    <div className={s.login_button} onClick={closeMenu}>
                      <a>upload</a>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  join us and contribute!
                  <Link href={`/login?redirect=${encodeURI(router.basePath)}`}>
                    <div className={s.login_button} onClick={closeMenu}>log in</div>
                  </Link>
                  <Link href={`/signup?redirect=${encodeURI(router.basePath)}`}>
                    <div className={s.signup_button} onClick={closeMenu}>sign up</div>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={s.notice_bar}>
            <div className={s.notice_bar_content}></div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default NavMenu;
