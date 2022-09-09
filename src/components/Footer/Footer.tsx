/*
 * Footer.tsx
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */
import Link from "next/link";
import { RiFacebookBoxLine, RiInstagramLine, RiMailLine } from "react-icons/ri";
import s from "./Footer.module.scss";

type FooterProps = {
  marginLeft?: string;
};

const Footer: React.FC<FooterProps> = function Footer({ marginLeft }) {
  return (
    <footer className={s.footer} style={{ paddingLeft: marginLeft }}>
      <div className={s.divider}></div>
      <div className={s.socials_row}>
        <div className={s.socials_line}></div>
        <RiInstagramLine />
        <RiFacebookBoxLine />
        <RiMailLine />
        <div className={s.socials_line}></div>
      </div>
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
      <div className={s.legal_row}>
        <Link href="/policies/privacy" passHref>
          <a className={s.legal_link}>
          Privacy
          </a>
        </Link>
        <Link href="/policies/termsofuse" passHref>
          <a className={s.legal_link}>
          Terms of Use
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
