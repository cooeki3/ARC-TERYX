// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";
import Logo from "../assets/ARCTERYX_text_logo.svg?react";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);

// CSS imports
import "../css/style.css";

// Component imports
// Navs
import TopNav from './01-TopNav.jsx';
import MenuNav from './02-MenuNav.jsx';
// Hero
import Hero from './04-Hero.jsx';
// Sections
import SectionCollection from './05-SectionCollection.jsx';
import SectionQuote from './06-sectionQuote.jsx';
// Footer
import Footer from './07-Footer.jsx';

function Home() {
  const heroTitleRef = useRef();
  const heroPRef = useRef();
  const langMenuRef = useRef();
  const textLogoRef = useRef();
  const landingBGRef = useRef();

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
          gsap.to('.text-logo', {
            filter: theme === 'black' ? 'brightness(0)' : 'brightness(0) invert(1)',
            duration: 0.6,
            ease: 'power4.out'
          })
        }
      }


      // ------------------------------Intro anim-------------------------------------------
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
      })
      tl.to(textLogoRef.current, {
        y: 0,
        duration: 1,
        ease: "power3.inOut"
      });

      // Landing BG anim.
      tl.fromTo('.landing-bg', {
        y: 0,
      }, {
        yPercent: -100,
        duration: 1.3,
        ease: 'power4.out'
      }, 1.6)

      // Hero BG anim. anim.
      tl.fromTo('.hero-bg', {
        scale: 1.05,
        yPercent: 20,
      }, {
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out'
      }, 1.6)

      // Init Logo color anim on scroll (based on sections)
      tl.call(initLogoScrollTriggers,
        [], 2.3);

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
        }, 2.2
      );

      tl.fromTo('.nav__lang-dropdown-below ',
        {
          backdropFilter: 'blur(0px)',
        },
        {
          backdropFilter: 'blur(20px)',
          duration: 1.6,
          ease: 'power4.out',
        }, 2.2
      );

      // Hero title and p anim.
      tl.fromTo(heroTitleSplit.lines, {
        yPercent: 100,
      }, {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2
      }, 2.3)
      tl.fromTo(heroPSplit.lines, {
        yPercent: 100,
      }, {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2
      }, 2.4)

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
        }, 2.5)

      tl.fromTo('.nav__menu-dropdown-below',
        {
          backdropFilter: 'blur(0px)',
        },
        {
          backdropFilter: 'blur(20px)',
          duration: 1.6,
          ease: 'power4.out',
        }, 2.5)

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
      <SectionCollection />
      <SectionQuote />
      <Footer />
    </section>
  )
}

export default Home
