/*
 * index.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 the nobot space, 
 */
import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import NavLink from "../NavLink/NavLink";
import s from "./NavMenu.module.scss";

type NavMenuProps = {
  toggled?: boolean;
};

const NavMenu: React.FC<NavMenuProps> = function NavMenu({ toggled }) {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      appear
      in={toggled}
      timeout={300}
      nodeRef={menuRef}
    >
      <div className={s.nav_menu_container} ref={menuRef}>
        <div className={s.nav_menu_content}>
          HI
        </div>
        <div className={s.notice_bar}>
          <div className={s.notice_bar_content}></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NavMenu;
