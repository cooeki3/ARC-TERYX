// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";
import Logo from '../../assets/images/ARCTERYX_text_logo.svg?react';
import { SlowMo } from "gsap/EasePack";

// Lenis imports
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'


gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools, SlowMo);

// CSS imports
import "../../styles/style.css";

// Component imports
// Navs
import TopNav from '../../components/Header/TopNav.jsx';
import MenuNav from '../../components/Header/MenuNav.jsx';
import BottomNav from '../../components/Header/BottomNav.jsx';
// Hero
import Hero from './Hero.jsx';
// Sections
import SectionCollection from './SectionCollection.jsx';
import SectionQuote from './SectionQuote.jsx';
import SectionInfiniteSwiper from './SectionInfiniteSwiper.jsx';
// Footer
import Footer from '../../components/Footer/Footer.jsx';

// Other imports
import {
    imageARCTERYXSlide01,
    imageARCTERYXSlide02,
    imageARCTERYXSlide03,
    imageARCTERYXSlide04,
    imageARCTERYXSlide05,

} from "../../assets/images";

export default function Index() {
    const heroTitleRef = useRef();
    const heroPRef = useRef();
    const langMenuRef = useRef();

    const miniLogoRef = useRef();
    const largeLogoRef = useRef();
    const landingBGRef = useRef();
    const sectionCollectionRef = useRef();

    const skipIntro = false;
    const lenis = useLenis();

    useLayoutEffect(() => {
        if (!lenis) return;
        // GSAP context scopes animations to this component
        const ctx = gsap.context(() => {

            // ------------------------------Intro anim-------------------------------------------
            if (skipIntro) {
                gsap.set('.landing-bg', {
                    display: 'none'
                })
                gsap.set('.nav__lang-dropdown-container', {
                    opacity: 1
                })
                gsap.set('.section-menu__nav', {
                    opacity: 1
                })


                gsap.set(largeLogoRef.current, {
                    y: 0,
                    yPercent: 0,
                },
                )

                gsap.set('.landing-logo-container', {
                    width: '100%',
                },
                );

            }
            else {
                const heroTitleSplit = new SplitText(heroTitleRef.current, {
                    type: 'lines',
                    mask: 'lines',
                });

                const heroPSplit = new SplitText(heroPRef.current, {
                    type: 'lines',
                    mask: 'lines',
                });

                const tl = gsap.timeline();
                // Text logo anim.
                gsap.set(largeLogoRef.current, {
                    display: 'block',
                    y: window.innerHeight,
                    opacity: 1,
                })

                // gsap.set(largeLogoRef.current.querySelectorAll('path, polygon'), {
                //     fill: '#b1af99'
                // });

                // Disables scroll
                tl.call(() => lenis?.stop(),
                    [], 0
                )

                gsap.set(largeLogoRef.current, {
                    yPercent: -50,
                });

                tl.to(largeLogoRef.current, {
                    y: window.innerHeight / 2 - 60,
                    duration: 1.6,
                    ease: "power3.out",
                }, 0)

                // Landing BG anim.
                tl.fromTo('.landing-bg', {
                    y: 0,
                }, {
                    yPercent: -100,
                    duration: 1.6,
                    ease: "power4.inOut"
                }, 1.2
                )

                tl.to(largeLogoRef.current, {
                    y: 0,
                    yPercent: 0,
                    duration: 1.1,
                    ease: "power3.inOut"
                }, 1.5
                )

                tl.to('.landing-logo-container', {
                    width: '100%',
                    duration: 1,
                    ease: "power3.out"
                }, 2
                );

                // Enables scroll
                tl.call(() => lenis?.start(),
                    [], 2
                )

                // Hero BG anim. anim.
                tl.fromTo('.hero-bg video', {
                    yPercent: 60,
                    scale: 1.2,
                }, {
                    yPercent: 0,
                    scale: 1,
                    duration: 1.1,
                    ease: 'power4.out'
                }, 1.8)

                // Init Logo color anim on scroll (based on sections)
                // tl.call(initLogoScrollTriggers,
                //     [], 2.4);

                // Nav lang. anim.
                tl.fromTo('.nav__lang-dropdown-container',
                    {
                        yPercent: 105,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power4.out',
                    }, 2.3
                );

                // Hero title and p anim.
                tl.fromTo(heroTitleSplit.lines, {
                    yPercent: 105,
                }, {
                    yPercent: 0,
                    duration: 0.8,
                    ease: 'power4.out',
                }, 2.4
                )

                tl.fromTo(heroPSplit.lines, {
                    yPercent: 105,
                }, {
                    yPercent: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power4.out',
                }, 2.5
                )

                // Nav menu anim.
                tl.fromTo('.section-menu__nav',
                    {
                        yPercent: 105,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power4.out',
                    }, 2.9
                )
                tl.fromTo('.section-bottom-nav',
                    {
                        yPercent: 105,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power4.out',
                    }, 2.9
                )
            }
            // GSDevTools.create({
            //     animation: tl,
            // });

            // Mini-logo display
            gsap.set(miniLogoRef.current, {
                yPercent: -100,
            });

            ScrollTrigger.create({
                trigger: sectionCollectionRef.current,
                start: "top top+=18vh",
                // markers: true,
                onEnter: () => {
                    gsap.to(miniLogoRef.current, {
                        yPercent: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                    });
                },

                onLeaveBack: () => {
                    gsap.to(miniLogoRef.current, {
                        yPercent: 100,
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.5,
                    });
                },
            });


        })

        // Revert all GSAP changes when component is removed
        return () => ctx.revert();
    }, [lenis])

    return (
        <section className="page-wrapper">
            <div className="landing-bg" ref={landingBGRef}></div>
            <TopNav
                langMenuRef={langMenuRef}
                miniLogoRef={miniLogoRef}
                sectionCollectionRef={sectionCollectionRef}
            />
            <div className='landing-logo-container'>
                <Logo ref={largeLogoRef} />
            </div>
            <MenuNav />
            <BottomNav />
            <Hero
                heroTitleRef={heroTitleRef}
                heroPRef={heroPRef}
            />
            {/*-------------------------------- Sections---------------------------------- */}
            <SectionCollection sectionCollectionRef={sectionCollectionRef} />
            <SectionQuote />
            <SectionInfiniteSwiper lenis={lenis}>
                <img src={imageARCTERYXSlide01} alt="" />
                <img src={imageARCTERYXSlide02} alt="" />
                <img src={imageARCTERYXSlide03} alt="" />
                <img src={imageARCTERYXSlide04} alt="" />
                <img src={imageARCTERYXSlide05} alt="" />
            </SectionInfiniteSwiper>
            {/*--------------------------------------------------------------------------- */}
            <Footer />

            {/* <div
                onMouseDown={() => console.log('test div clicked')}
                style={{ padding: 40, background: 'red', color: 'white' }}
            >
                click me
            </div> */}
        </section>
    )
}
