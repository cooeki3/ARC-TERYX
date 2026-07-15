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
    const infiniteTrack = infiniteTrackRef.current;

    // Strict mode
    let cancelled = false;

    let onDown;
    let onUp;
    const ctx = gsap.context(() => {

      // Wait for media so the looper knows their widths and does't break the visual
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

      waitForMedia.then(() => {
        if (cancelled) return;

        // Loop ini.
        const loop = horizontalLoop(slides, {
          repeat: -1,
          speed: 1,
          inertia: true
        });

        //Click & hold anim.
        let isHolding = false;
        let baseSpeed = 1;
        let holdSpeed = 10;

        // On hold of the infinite swiper : increase it's speed
        onDown = () => {
          if (isHolding) return;

          isHolding = true;
          baseSpeed = loop.timeScale();

          gsap.to(loop, {
            timeScale: Math.sign(loop.timeScale()) * holdSpeed,
            duration: 0.3,
            overwrite: true,
          })
        }

        // When stopping to hold of the infinite swiper : go back to original speed
        onUp = () => {
          isHolding = false;

          gsap.to(loop, {
            timeScale: Math.sign(loop.timeScale()),
            duration: 1,
            overwrite: true,
          })
        }

        infiniteTrack.addEventListener('pointerdown', onDown)
        infiniteTrack.addEventListener('pointerup', onUp)
        // infiniteTrack.addEventListener("pointerleave", onUp);
        // infiniteTrack.addEventListener("pointercancel", onUp);


        // Scroll anim.
        ScrollTrigger.create({
          trigger: ".section-infinite-swiper",
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            if (isHolding) return;

            const scrollVelocity = self.getVelocity();
            const dir = scrollVelocity < 0 ? -1 : 1;
            const magnitude = gsap.utils.clamp(1, 10, 1 + Math.abs(scrollVelocity) / 200);

            gsap.to(loop, {
              timeScale: dir * magnitude,
              duration: 0.1,
              overwrite: true
            });
          }
        });


      });
    });

    return () => {
      cancelled = true;
      ctx.revert();

      if (onDown) {
        infiniteTrack.removeEventListener("pointerdown", onDown);
      }
      if (onUp) {
        infiniteTrack.removeEventListener("pointerup", onUp);
      }
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