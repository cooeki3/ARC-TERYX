// React imports
import { useLayoutEffect, useRef } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";
import ScrollTrigger from 'gsap/ScrollTrigger';
import horizontalLoop from "../utils/horizontalLoop";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

function SectionInifiniteSwiper() {
  const infiniteTrackRef = useRef();

  useLayoutEffect(() => {
    // Strict mode
    let cancelled = false;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".slide");
      const media = slides.flatMap(slide => [...slide.querySelectorAll("img, video")]);

      const waitForMedia = Promise.all(
        media.map(el => {
          if (el.tagName === "IMG") {
            return el.complete ? Promise.resolve() : new Promise(res => el.onload = res);
          }
          if (el.tagName === "VIDEO") {
            return el.readyState >= 2 ? Promise.resolve() : new Promise(res => el.onloadeddata = res);
          }
        })
      );

      // Wait for media so the looper knows their widths and does't break the visual
      waitForMedia.then(() => {
        if (cancelled) return;

        // Loop ini.
        const loop = horizontalLoop(slides, {
          repeat: -1,
          speed: 1,
          draggable: true,
          inertia: true
        });

        const draggable = loop.draggable;

        // Drag anim.
        if (draggable) {
          const originalOnRelease = draggable.vars.onRelease;

          draggable.vars.onPress = () => {
            gsap.to(slides, { scale: 0.94, filter: "brightness(0.85)", duration: 0.3, ease: "power2.out" });
          };

          draggable.vars.onRelease = function () {
            gsap.to(slides, { scale: 1, filter: "brightness(1)", duration: 0.4, ease: "power2.out" });
            if (originalOnRelease) originalOnRelease.call(this);
          };
        }

        // Scroll anim.
        ScrollTrigger.create({
          trigger: ".section-infinite-swiper",
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const scrollVelocity = self.getVelocity();
            const dir = scrollVelocity < 0 ? -1 : 1;
            const magnitude = gsap.utils.clamp(1, 10, 1 + Math.abs(scrollVelocity) / 200);

            gsap.to(loop, { timeScale: dir * magnitude, duration: 0.1, ease: "power2.out", overwrite: true });
          }
        });
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <div className="section-infinite-swiper" data-logo="black">
      <div className="infinite-track" ref={infiniteTrackRef}>
        <div className="slide">
          <video src="../videos/ARCTERYX_placeholder_01.mp4" autoPlay loop muted />
        </div>
        <div className="slide">
          <img src="../images/ARTCTERYX_swiper_product_05.png" alt="" />
        </div>
        <div className="slide">
          <video src="../videos/ARCTERYX_placeholder_02.mp4" autoPlay loop muted />
        </div>
        <div className="slide">
          <img src="../images/ARTCTERYX_swiper_product_04.png" alt="" />
        </div>
        <div className="slide">
          <video src="../videos/ARCTERYX_placeholder_03.mp4" autoPlay loop muted />
        </div>
        <div className="slide">
          <img src="../images/ARTCTERYX_swiper_product_03.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default SectionInifiniteSwiper