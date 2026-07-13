// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from 'gsap/SplitText';
import { Draggable } from "gsap/Draggable";
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import GSDevTools from "gsap/GSDevTools";
import Logo from "../assets/ARCTERYX_text_logo.svg?react";
import horizontalLoop from "../utils/horizontalLoop";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools, Draggable, InertiaPlugin);

function SectionInifiniteSwiper() {
  const infiniteTrackRef = useRef();

  useLayoutEffect(() => {
    let cancelled = false;

    const ctx = gsap.context(() => {

      const slides = gsap.utils.toArray(".slide");

      const media = slides.flatMap(slide =>
        [...slide.querySelectorAll("img, video")]
      );

      const waitForMedia = Promise.all(
        media.map(el => {
          if (el.tagName === "IMG") {
            return el.complete
              ? Promise.resolve()
              : new Promise(resolve => { el.onload = resolve; });
          }
          if (el.tagName === "VIDEO") {
            return el.readyState >= 2
              ? Promise.resolve()
              : new Promise(resolve => { el.onloadeddata = resolve; });
          }
        })
      );

      waitForMedia.then(() => {
        if (cancelled) return;

        const loop = horizontalLoop(slides, {
          repeat: -1,
          speed: 1,
          draggable: true,
          inertia: true
        });

        let scrollVelocity = 0;

        ScrollTrigger.create({
          trigger: ".section-infinite-swiper",
          start: "top bottom",
          end: "bottom top",

          onUpdate(self) {
            scrollVelocity = self.getVelocity();
            const dir = scrollVelocity < 0 ? -1 : 1;
            const magnitude = gsap.utils.clamp(1, 10, 1 + Math.abs(scrollVelocity) / 200);

            gsap.to(loop, {
              timeScale: dir * magnitude,
              duration: 0.1,
              ease: "power2.out",
              overwrite: true
            });
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
    <div
      className="section-infinite-swiper"
      data-logo="black"
    >
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
