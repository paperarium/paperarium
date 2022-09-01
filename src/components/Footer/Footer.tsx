/*
 * Footer.tsx
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */
import { RiFacebookBoxLine, RiInstagramLine, RiMailLine } from "react-icons/ri";
import s from "./Footer.module.scss";

type FooterProps = {
  marginLeft?: string;
};

const Footer: React.FC<FooterProps> = function Footer({ marginLeft }) {
  return (
    <footer className={s.footer} style={{ paddingLeft: marginLeft }}>
      <div className={s.socials_row}>
        <div className={s.socials_line}></div>
        <RiInstagramLine />
        <RiFacebookBoxLine />
        <RiMailLine />
        <div className={s.socials_line}></div>
      </div>
      <div className={s.title}>paperarium</div>
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
        <div className={s.legal_link}>Legal</div>
        {/* @ts-ignore */}
        <div className={s.legal_link} onClick={() => displayPreferenceModal()}>
          Cookies
        </div>
      </div>
      {/* <button
        className="termly-cookie-preference-button"
        type="button"
        style={{
          background: "white",
          width: "165px",
          height: "30px",
          borderRadius: "3px",
          border: "1px solid #5f7d9c",
          fontSize: "10px",
          color: "#5f7d9c",
          cursor: "pointer",
          outline: "none",
          padding: "0",
        }}
        // @ts-ignore
        onClick={() => displayPreferenceModal()}
      >
        Manage Cookie Preferences
      </button> */}
    </footer>
  );
};

export default Footer;
