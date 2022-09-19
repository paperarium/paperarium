/*
 * Footer.tsx
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */
import Link from 'next/link';
import {
  IoCubeOutline,
  IoPeopleOutline,
  IoShapesOutline,
  IoTelescopeOutline,
} from 'react-icons/io5';
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiScissorsCutFill,
} from 'react-icons/ri';
import NavLink from '../NavLink/NavLink';
import s from './Footer.module.scss';

type FooterProps = {
  marginLeft?: string;
};

const Footer: React.FC<FooterProps> = function Footer({ marginLeft }) {
  return (
    <footer className={s.footer} style={{ paddingLeft: marginLeft }}>
      <div className={s.divider}></div>
      <div className={s.footer_row}>
        <div className={s.footer_header_row}>
          <div className={s.footer_col} style={{ flex: 1 }}>
            <div className={s.title}>paperarium</div>
            <div>a personal project.</div>
            <div className={s.credits}>
              ·:·*.✧
              <a
                href="https://evankirkiles.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                by evan
              </a>
              ✧.*·:·
            </div>
          </div>
          <div className={s.socials_row}>
            <a
              href="https://instagram.com/paperarium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiInstagramLine />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100085641023066"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiFacebookBoxLine />
            </a>
            <a href="mailto:kirkilese@gmail.com?subject=[Paperarium] - My subject">
              <RiMailLine />
            </a>
          </div>
        </div>

        <div
          className={s.link_grid}
          style={{ minWidth: '300px', padding: '5px' }}
        >
          <div className={s.link_grid}>
            <div className={s.nav_cell}>
              <div className={s.nav_header}>
                <IoShapesOutline /> Papercrafts
              </div>
              <div className={s.nav_option}>How to design</div>
              <div className={s.nav_option}>Most popular</div>
              <div className={s.nav_option}>Top designers</div>
            </div>
            <div className={s.nav_cell}>
              <div className={s.nav_header}>
                <IoCubeOutline /> Builds
              </div>
              <div className={s.nav_option}>How to build</div>
              <div className={s.nav_option}>Most popular</div>
              <div className={s.nav_option}>Top builders</div>
            </div>
          </div>
          <div className={s.link_grid}>
            <div className={s.nav_cell}>
              <div className={s.nav_header}>
                <IoPeopleOutline /> Community
              </div>
              <div className={s.nav_option}>Collectives</div>
              <div className={s.nav_option}>Profiles</div>
              <div className={s.nav_option}>Forum</div>
            </div>
            <div className={s.nav_cell}>
              <div className={s.nav_header}>
                <IoTelescopeOutline />
                History
              </div>
              <div className={s.nav_option}>Timeline</div>
              <div className={s.nav_option}>Memories</div>
              <div className={s.nav_option}>About</div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.footer_row}>
        <div className={s.footer_col}>
          <div className={s.socials_line}></div>
          <div className={s.disclaimer}>
            All rights and intellectual property for the characters on this site
            go to their respective owners. We are in no way affiliated with any
            corporation.
          </div>
          <div className={s.legal_row}>
            <Link href="/policies/privacy" passHref>
              <a className={s.legal_link}>Privacy</a>
            </Link>
            <Link href="/policies/termsofuse" passHref>
              <a className={s.legal_link}>Terms of Use</a>
            </Link>
            <Link href="/policies/cookies" passHref>
              <a className={s.legal_link}>Cookies</a>
            </Link>
            <div style={{ flex: 1 }}></div>
            <div className={s.website_version}>
              Website version: {COMMITDATE}
            </div>
            {/* <div style={{ flex: 1}}></div> */}
            {/* <div style={{ border: '1px solid black', padding: '5px'}}>c. 2022</div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
