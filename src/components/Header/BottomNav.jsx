// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";
import CurrentTime from '../CurrentTime';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);

export default function BottomNav() {
    const bottomNavRef = useRef();

    // Appear/Disappear anim.
    useLayoutEffect(() => {
        ScrollTrigger.create({
            trigger: ".section-hero",
            start: "8% top",

            onEnter: () => {
                gsap.to(bottomNavRef.current, {
                    yPercent: 50,
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.5,
                });
            },

            onLeaveBack: () => {
                gsap.to(bottomNavRef.current, {
                    yPercent: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                });
            },
        });
    }, [])

    return (
        <div className='section-bottom-nav' ref={bottomNavRef}>
            <div className="col col-1">©2026 Arc'teryx - Digital Experience Concept
                <a href="">
                    &nbsp;[Learn more]
                </a>
            </div>
            <div className="col col-2">
                <CurrentTime />
            </div>
        </div>
    )
}