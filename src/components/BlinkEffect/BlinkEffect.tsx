/*
 * BlinkEffect.tsx
 * author: evan kirkiles
 * created on Sat Sep 03 2022
 * 2022 the nobot space,
 */
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import s from "./BlinkEffect.module.scss";

type BlinkEffectProps = {
  active?: boolean;
  zIndex?: number;
};

const BlinkEffect: React.FC<BlinkEffectProps> = function BlinkEffect({
  active,
  zIndex,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition appear classNames={"ring"} nodeRef={containerRef} timeout={700} in={active}>
      <div className={s.container} ref={containerRef} style={{ zIndex }}>
        <div className={s.ring_1}></div>
        <div className={s.ring_1}></div>
      </div>
    </CSSTransition>
  );
};

export default BlinkEffect;
