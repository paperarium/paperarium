import Hamburger from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavLink from "../NavLink/NavLink";
import NavMenu from "../NavMenu/NavMenu";
import { RiScissorsCutLine } from "react-icons/ri";
import s from "./NavBar.module.scss";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import LOGO from "../../../public/img/logo.svg";
import { useQuery } from "@tanstack/react-query";
import { listAnnouncements } from "../../supabase/api/announcements";
import { getSelf } from "../../supabase/api/profiles";

const NavBar: React.FC = function NavBar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();
  const { data: profile } = useQuery(["profileself"], () => getSelf(user!.id), {
    enabled: !!user?.id,
  });

  return (
    <>
      <NavMenu toggled={navOpen} setToggled={setNavOpen} />
      <nav className={s.container}>
        <Link href="/" passHref>
          <a className={s.title_container} onClick={() => setNavOpen(false)}>
            {/* eslint-disable @next/next/no-img-element */}
            <img src={LOGO.src} alt={"logo"} className={s.logo} />
            <span>paperarium</span>
          </a>
        </Link>
        <div className={s.links_container}>
          <NavLink href={"/catalog"}>catalog</NavLink>
          <NavLink href={"/howto"}>guides</NavLink>
          <NavLink href={"/about"}>history</NavLink>
        </div>
        <div className={s.spacer}></div>
        <div className={s.profile_buttons}>
          {profile ? (
            <>
              <Link href={`/upload`}>
                <div className={s.login_button}>
                  <a>upload</a>
                </div>
              </Link>
              <Link href={`/profile/${profile.username}`}>
                <div className={s.profile_container}>
                  <div className={s.profile_picture}></div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/login`} passHref>
                <a className={s.login_button}>login</a>
              </Link>
              or
              <Link href={`/login`} passHref>
                <a className={s.login_button}>sign up</a>
              </Link>
            </>
          )}
        </div>
        <div className={s.menu} onClick={() => setNavOpen(!navOpen)}>
          <div className={s.menu_text}>{navOpen ? "CLOSE" : "MENU"}</div>
          <Hamburger size={20} toggled={navOpen} toggle={setNavOpen} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
