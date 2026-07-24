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

    useLayoutEffect(() => {
        gsap.set(bottomNavRef.current, {
            opacity: 1,
        })
        gsap.set('.section-bottom-nav .col', {
            color: '#ffffff',
        });


        //------------------------Hero state anim.------------------------
        ScrollTrigger.create({
            trigger: ".section-hero",
            start: "top+=10% top",
            markers: true,

            onEnter: () => {
                gsap.set('.section-bottom-nav .col', {
                    color: '#fff',
                });
                gsap.to(bottomNavRef.current, {
                    padding: '0 60px 20px 60px',
                });

                gsap.to(bottomNavRef.current, {
                    yPercent: 50,
                    opacity: 0,
                    duration: 0.5,
                    // padding: '0 0 0 0',
                });
            },

            onLeaveBack: () => {
                gsap.set('.section-bottom-nav .col', {
                    color: '#fff',
                });
                gsap.to(bottomNavRef.current, {
                    padding: '0 60px 20px 60px',
                });

                gsap.to(bottomNavRef.current, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.5,
                });
            },
        });

        ScrollTrigger.create({
            trigger: ".section-footer",
            start: "bottom bottom",

            onEnter: () => {
                gsap.set('.section-bottom-nav .col', {
                    color: '#000',
                });
                gsap.to(bottomNavRef.current, {
                    padding: '110px 90px',
                });

                gsap.to(bottomNavRef.current, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out',
                    // delay: 0.5
                });
            },

            onLeaveBack: () => {
                gsap.set('.section-bottom-nav .col', {
                    color: '#000',
                });
                gsap.to(bottomNavRef.current, {
                    padding: '110px 90px',
                });
                gsap.to(bottomNavRef.current, {
                    yPercent: 50,
                    opacity: 0,
                    duration: 0.5,
                    // padding: '0 0 0 0',
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