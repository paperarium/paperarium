/*
 * index.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 the nobot space,
 */
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { listAnnouncements } from '../../supabase/api/announcements';
import { getSelf } from '../../supabase/api/profiles';
import NavLink from '../NavLink/NavLink';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import s from './NavMenu.module.scss';

type NavMenuProps = {
  toggled?: boolean;
  setToggled: (newToggle: boolean) => void;
};

const NavMenu: React.FC<NavMenuProps> = function NavMenu({
  toggled,
  setToggled,
}) {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const { data: profile } = useQuery(
    ['profiles', { id: user?.id }],
    () => getSelf(supabaseClient)(user!.id),
    {
      enabled: !!user?.id,
    }
  );
  const announcements = useQuery(
    ['announcements'],
    listAnnouncements(supabaseClient)
  );

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
              <NavLink href={'/catalog'} onClick={closeMenu}>
                catalog
              </NavLink>
              <NavLink href={'/community'} onClick={closeMenu}>
                community
              </NavLink>
              <NavLink href={'/howto'} onClick={closeMenu}>
                guides
              </NavLink>
              <NavLink href={'/about'} onClick={closeMenu}>
                history
              </NavLink>
            </div>
            <div className={s.nav_nav_column}>
              {profile ? (
                <>
                  <Link href={`/profiles/${profile.username}`} legacyBehavior>
                    <div className={s.profile_container} onClick={closeMenu}>
                      <div className={s.profile_picture}>
                        {profile.avatar_url ? (
                          <OptimizedImage
                            src={profile.avatar_url}
                            sizes={'20vw'}
                            className={s.profile_pic_image}
                          />
                        ) : null}
                      </div>
                      <div className={s.profile_name}>
                        <span className={s.user_name}>@{profile.username}</span>
                        <span>{profile.n_builds} builds</span>
                        <span>{profile.n_papercrafts} papercrafts</span>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/upload`} legacyBehavior>
                    <div className={s.login_button} onClick={closeMenu}>
                      <a>upload</a>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  join us and contribute!
                  <Link
                    href={`/login?redirect=${encodeURI(router.basePath)}`}
                    legacyBehavior
                  >
                    <div className={s.login_button} onClick={closeMenu}>
                      log in
                    </div>
                  </Link>
                  <Link
                    href={`/signup?redirect=${encodeURI(router.basePath)}`}
                    legacyBehavior
                  >
                    <div className={s.signup_button} onClick={closeMenu}>
                      sign up
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={s.notice_bar}>
            <div className={s.notice_bar_content}>
              {announcements.data
                ? announcements.data.map((a) => (
                    <div key={a.id}>˚◦○˚ ୧ .˚ₓ{a.text}ₓ˚. ୭ ˚○◦˚</div>
                  ))
                : null}
              {announcements.data
                ? announcements.data.map((a) => (
                    <div key={a.id}>˚◦○˚ ୧ .˚ₓ{a.text}ₓ˚. ୭ ˚○◦˚</div>
                  ))
                : null}
              {announcements.data
                ? announcements.data.map((a) => (
                    <div key={a.id}>˚◦○˚ ୧ .˚ₓ{a.text}ₓ˚. ୭ ˚○◦˚</div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default NavMenu;
