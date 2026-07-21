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
        let tl = gsap.timeline({ paused: true });
        tl.to(bottomNavRef.current, {
            yPercent: 50,
            opacity: 0,
            duration: 1.7,
            ease: 'power3.inOut',
        })

        ScrollTrigger.create({
            trigger: '.section-hero',
            start: '8% top',

            onEnter: () => {
                tl.timeScale(10).play();
            },

            onLeaveBack: () => {
                tl.timeScale(1).reverse();
            },
        })
    }, [])

    return (
        <div className='section-bottom-nav' ref={bottomNavRef}>
            <div className="col col-1">©2026 Arc'teryx - Digital Experience Concept</div>
            <div className="col col-2">
                <CurrentTime />
            </div>
        </div>
    )
}