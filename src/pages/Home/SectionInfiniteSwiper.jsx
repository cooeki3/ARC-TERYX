import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE_SPEED = 60;
const HOLD_SPEED = 30;
const MAX_BOOST = 30;
const VELOCITY_DIVISOR = 60;

export default function InfiniteSwiper({ children, lenis }) {
  const trackRef = useRef(null);
  const clonedRef = useRef(false);
  const state = useRef({ direction: 1, boost: 0, hold: 0, x: 0 });

  useEffect(() => {
    const track = trackRef.current;

    // Duplicate the children once so we have two back-to-back copies —
    // this is the entire "infinite" trick. No width math, no loop helper.
    // Guarded so this doesn't run twice if the effect re-fires once
    // useLenis() resolves from null to the real instance.
    if (!clonedRef.current) {
      const originalChildren = Array.from(track.children);
      originalChildren.forEach((child) => {
        track.appendChild(child.cloneNode(true));
      });
      clonedRef.current = true;
    }

    let setWidth = track.scrollWidth / 2;
    const recalcWidth = () => {
      setWidth = track.scrollWidth / 2;
    };
    window.addEventListener('resize', recalcWidth);

    gsap.ticker.add(tick);

    function tick(time, deltaTime) {
      const dt = Math.min(deltaTime / 1000, 0.05); // clamp so a dropped/stuttered frame can't cause a huge jump
      const { direction, boost, hold } = state.current;

      // Holding overrides scroll boost entirely, instead of multiplying
      // on top of it — otherwise grabbing right after a fast scroll
      // stacks both multipliers together and speed spikes way too high.
      const multiplier = 1 + boost + hold;
      const speed = BASE_SPEED * multiplier * direction;

      state.current.x -= speed * dt;

      // wrap seamlessly no matter how far x overshoots in a single frame
      state.current.x = gsap.utils.wrap(-setWidth, 0, state.current.x);

      gsap.set(track, { x: state.current.x });
    }

    // If you're on Lenis, ScrollTrigger's native scroll listener never fires
    // because Lenis intercepts the wheel/scroll events itself. Wire Lenis's
    // own scroll tick into ScrollTrigger so getVelocity() actually updates.
    // Pass your lenis instance in as a prop: <InfiniteSwiper lenis={lenis}>
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    let decayTween;
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        state.current.direction = velocity < 0 ? -1 : 1;
        state.current.boost = gsap.utils.clamp(0, MAX_BOOST, Math.abs(velocity) / VELOCITY_DIVISOR);

        decayTween && decayTween.kill();
        decayTween = gsap.to(state.current, {
          boost: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      window.removeEventListener('resize', recalcWidth);
      gsap.ticker.remove(tick);
      st.kill();
      decayTween && decayTween.kill();
      if (lenis) lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  const holdTween = useRef(null);

  const handleHoldStart = () => {
    state.current.boost = 0;

    holdTween.current && holdTween.current.kill();
    holdTween.current = gsap.to(state.current, {
      hold: HOLD_SPEED,
      duration: 0.6,
      ease: 'power4.out',
    });

    gsap.to(trackRef.current.querySelectorAll('img'), {
      scale: 0.85,
      filter: 'brightness(0.8)',
      stagger: 0.02,
      duration: 0.35,
      ease: 'power4.out',
    });
  };

  const handleHoldEnd = () => {
    holdTween.current && holdTween.current.kill();
    holdTween.current = gsap.to(state.current, {
      hold: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.to(trackRef.current.querySelectorAll('img'), {
      scale: 1,
      filter: 'brightness(1)',
      stagger: 0.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className="infinite-swiper"
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      <div className="infinite-swiper__track" ref={trackRef}>
        {children}
      </div>
    </div>
  );
}