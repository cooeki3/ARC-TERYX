// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";
import Logo from '../../assets/images/ARCTERYX_text_logo.svg?react';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);

// CSS imports
import "../../styles/style.css";

// Component imports
// Navs
import TopNav from '../../components/Header/TopNav.jsx';
import MenuNav from '../../components/Header/MenuNav.jsx';
// Hero
import Hero from './Hero.jsx';
// Sections
import SectionCollection from './SectionCollection.jsx';
import SectionQuote from './SectionQuote.jsx';
import SectionInfiniteSwiper from './SectionInifiteSwiper.jsx';
// Footer
import Footer from '../../components/Footer/Footer.jsx';

function Home() {
    const heroTitleRef = useRef();
    const heroPRef = useRef();
    const langMenuRef = useRef();
    const textLogoRef = useRef();
    const landingBGRef = useRef();

    const skipIntro = false;

    useLayoutEffect(() => {
        // GSAP context scopes animations to this component
        const ctx = gsap.context(() => {
            // ---------------------------Logo color anim (by section)-----------------------
            function initLogoScrollTriggers() {
                const sections = gsap.utils.toArray("[data-logo]");

                sections.forEach((section, index) => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 3%",

                        onEnter: () => changeLogo(section.dataset.logo),

                        onLeaveBack: () => {
                            const previous = sections[index - 1];

                            if (previous) {
                                changeLogo(previous.dataset.logo);
                            }
                        }
                    });
                });

                function changeLogo(theme) {
                    gsap.to(textLogoRef.current.querySelectorAll('path, polygon'), {
                        fill: theme === 'black' ?
                            '#000'
                            : '#fff',
                        duration: 0.6,
                        ease: 'power4.out'
                    })
                }
            }


            // ------------------------------Intro anim-------------------------------------------
            if (skipIntro) {
                gsap.set('.landing-bg', {
                    display: 'none'
                })

                initLogoScrollTriggers();
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
                gsap.set(textLogoRef.current, {
                    y: window.innerHeight,
                })

                gsap.set(textLogoRef.current.querySelectorAll('path, polygon'), {
                    fill: '#b1af99'
                });

                tl.to(textLogoRef.current, {
                    y: window.innerHeight / 2 - 50,
                    duration: 1.2,
                    ease: "power2.out"
                }, 0)

                tl.to(textLogoRef.current, {
                    y: 0,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, 1.2
                );

                tl.to(textLogoRef.current.querySelectorAll('path, polygon'), {
                    fill: '#ffffff',
                    duration: 1.2,
                    ease: "power4.inOut"
                }, 1.2
                );

                // Landing BG anim.
                tl.fromTo('.landing-bg', {
                    y: 0,
                }, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, 1.2
                )

                // Hero BG anim. anim.
                tl.fromTo('.hero-bg', {
                    scale: 1.1,
                    yPercent: 20,
                }, {
                    yPercent: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power4.out'
                }, 1.4)

                // Init Logo color anim on scroll (based on sections)
                tl.call(initLogoScrollTriggers,
                    [], 2.4);

                // Nav lang. anim.
                tl.fromTo('.nav__lang-dropdown-container',
                    {
                        yPercent: 100,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.6,
                        ease: 'power4.out',
                    }, 2
                );

                // tl.fromTo('.nav__lang-dropdown-below ',
                //   {
                //     backdropFilter: 'blur(0px)',
                //   },
                //   {
                //     backdropFilter: 'blur(20px)',
                //     duration: 1.6,
                //     ease: 'power4.out',
                //   }, 2
                // );

                // Hero title and p anim.
                tl.fromTo(heroTitleSplit.lines, {
                    yPercent: 100,
                }, {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: 0.2
                }, 2.1
                )

                tl.fromTo(heroPSplit.lines, {
                    yPercent: 100,
                }, {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: 0.2
                }, 2.2)

                // Nav menu anim.
                tl.fromTo('.section-menu__nav',
                    {
                        yPercent: 100,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.6,
                        ease: 'power4.out',

                    }, 2.3
                )
            }
            // tl.fromTo('.nav__menu-dropdown-below',
            //   {
            //     backdropFilter: 'blur(0px)',
            //   },
            //   {
            //     backdropFilter: 'blur(20px)',
            //     duration: 1.6,
            //     ease: 'power4.out',
            //   }, 3)

            // GSDevTools.create({
            //   animation: tl,
            // });
        })

        // Revert all GSAP changes when component is removed
        return () => ctx.revert();
    }, [])

    return (
        <section className="page-wrapper">
            <div className="landing-bg" ref={landingBGRef}></div>
            <TopNav
                langMenuRef={langMenuRef}
                textLogoRef={textLogoRef}
            />
            <MenuNav />
            <Hero
                heroTitleRef={heroTitleRef}
                heroPRef={heroPRef}
            />
            {/*-------------------------------- Sections---------------------------------- */}
            <SectionCollection />
            <SectionQuote />
            <SectionInfiniteSwiper />
            {/*--------------------------------------------------------------------------- */}
            <Footer />
        </section>
    )
}

export default Home
