/*
 * FallbackOverlay.tsx
 * author: evan kirkiles
 * created on Mon Sep 19 2022
 * 2022 the nobot space,
 */

import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { RiScissorsFill } from 'react-icons/ri';
import { CSSTransition } from 'react-transition-group';
import s from './FallbackOverlay.module.scss';

/**
 * An overlay to display while a fallback page is showing. Cuts away like a
 * papercraft to display the page once the fallback page is cleared.
 * @returns
 */
const FallbackOverlay: React.FC = function FallbackOverlay() {
  const router = useRouter();
  const [seeFallback, setSeeFallback] = useState(router.isFallback);
  const fallbackRef = useRef<HTMLDivElement>(null);
  if (!seeFallback) return null;

  return (
    <CSSTransition
      in={router.isFallback}
      nodeRef={fallbackRef}
      timeout={300}
      classNames={'fallback'}
      onExited={() => {
        // wait for halves to be gone before removing the overlay from the page
        setTimeout(() => {
          setSeeFallback(false);
        }, 400);
      }}
    >
      <div className={s.container} ref={fallbackRef}>
        <div className={s.half1}>
          <div className={s.logo}>
            paperarium
            <br />
            <span className={s.loading_text}>is loading...</span>
          </div>
        </div>
        <div className={s.scissors}>
          <RiScissorsFill size={40} />
        </div>
        <div className={s.half2}>
          <div className={s.logo}>
            paperarium
            <br />
            <span className={s.loading_text}>is loading...</span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default FallbackOverlay;
