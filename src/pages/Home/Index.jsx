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
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';

// Lenis imports
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'


gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools, SlowMo, ScrambleTextPlugin);

// CSS imports
import "../../styles/style.css";

// Component imports
import CustomCursor from '../../components/CustomCursor.jsx';
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

    const localTimeRef = useRef();
    const hqTimeRef = useRef();
    const [startClock, setStartClock] = useState(false);

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
                    opacity: 0,
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
                // gsap.set(largeLogoRef.current, {
                //     display: 'block',
                //     y: window.innerHeight,
                //     opacity: 1,
                // })
                // Disables scroll
                tl.call(() => lenis?.stop(),
                    [], 0
                )

                gsap.set(largeLogoRef.current, {
                    opacity: 0,
                    yPercent: -50,
                    y: window.innerHeight / 2 - 60,
                });


                gsap.fromTo(largeLogoRef.current, {
                    opacity: 0,
                    filter: 'blur(10px)',
                }, {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'power4.out'
                }
                );

                // tl.to(largeLogoRef.current, {
                //     y: window.innerHeight / 2 - 60,
                //     duration: 1.6,
                //     ease: "power3.out",
                // }, 0)

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

                // Large logo transition to topnav logo
                tl.to('.landing-logo-container', {
                    width: '100%',
                    duration: 1,
                    ease: "power3.out",
                    onComplete: () => {
                        gsap.fromTo('.landing-logo-container', {
                            width: '100%'
                        }, {
                            padding: '20px 60px 60px 60px',
                            width: '18%',
                            duration: 1.1,
                            scrollTrigger: {
                                trigger: '.section-hero',
                                start: 'top top',
                                end: () => "+=" + window.innerHeight / 4 * 3,
                                scrub: true,
                                // markers: true
                            }
                        }
                        );
                    }
                }, 2);

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
                // tl.fromTo('.section-bottom-nav',
                //     {
                //         yPercent: 105,
                //         opacity: 0,
                //     },
                //     {
                //         yPercent: 0,
                //         opacity: 1,
                //         duration: 1.2,
                //         ease: 'power4.out',
                //     }, 2.9
                // )
                //-------------------------------Scrambled text---------------------------------------


                const localTimeText = localTimeRef.current.textContent;
                const hqTimeText = hqTimeRef.current.textContent;
                const TRANSITION_DURATION = 2;

                gsap.set(".section-bottom-nav .col-1", {
                    textContent: "\u00A0"
                });
                gsap.set(".current-time div span", {
                    textContent: "\u00A0"
                });


                tl.to('.section-bottom-nav .col-1', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "©2026 Arc'teryx - Digital Experience Concept",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ2026",
                        // speed: 0.5,
                    }
                }, 2.9);

                // Reveal labels
                tl.to('.row-local span:first-child', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "LOCAL TIME",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    }
                }, 2.9);


                // Reveal local time
                tl.to(localTimeRef.current, {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: localTimeText,
                        chars: "0123456789:",
                    }
                }, 3.3);


                // Reveal HQ label
                tl.to('.row-hq span:first-child', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "ARC'TERYX HQ",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    }
                }, 3);


                // Reveal HQ time
                tl.to(hqTimeRef.current, {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: hqTimeText,
                        chars: "0123456789:",
                    }
                }, 3.4);


                // Reveal rest
                tl.to('.row-location span:first-child', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "BASE LOCATION",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    }
                }, 3.1);

                tl.to('.row-location span:nth-child(2)', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "NORTH VANCOUVER, CANADA",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ, ",
                    }
                }, 3.5);


                tl.to('.row-coordinates span:first-child', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "COORDINATES",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    }
                }, 3.2);

                tl.to('.row-coordinates span:nth-child(2)', {
                    duration: TRANSITION_DURATION,
                    ease: 'power4.out',
                    scrambleText: {
                        text: "49.3206° N / 122.9540° W",
                        chars: "0123456789°N/W. ",
                    }
                }, 3.6);

                tl.call(() => {
                    setStartClock(true);
                }, [], 3.9);


                // GSDevTools.create({
                //     animation: tl,
                // });
            }

            // Large logo transition to topnav logo


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
        <>
            <TopNav
                langMenuRef={langMenuRef}
                miniLogoRef={miniLogoRef}
                sectionCollectionRef={sectionCollectionRef}
            />
            {/* <CustomCursor /> */}
            <section className="page-wrapper">
                <div className="landing-bg" ref={landingBGRef}></div>
                <div className='landing-logo-container'>
                    <Logo ref={largeLogoRef} />
                </div>
                <MenuNav />
                <BottomNav
                    localTimeRef={localTimeRef}
                    hqTimeRef={hqTimeRef}
                    startClock={startClock}
                />
                <Hero
                    heroTitleRef={heroTitleRef}
                    heroPRef={heroPRef}
                />
                {/*-------------------------------- Sections---------------------------------- */}
                <div className='collection-nav-target'></div>
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
        </>
    )
}
