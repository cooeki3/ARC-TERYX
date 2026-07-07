// GSAP Imports
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react';

// CSS imports
import "./css/style.css";
import 'lenis/dist/lenis.css'

// Navs
import LangNav from './components/01-LangNav.jsx';
import MenuNav from './components/02-MenuNav.jsx';
// Hero
import LandingPage from './components/03-LandingPage.jsx';
import Hero from './components/04-Hero.jsx';
// Sections
import SectionCollection from './components/05-SectionCollection.jsx';
import SectionQuote from './components/06-sectionQuote.jsx';
// Footer
import Footer from './components/07-Footer.jsx';

function App() {
  // Lenis ini.
  const lenis = useLenis((lenis) => { })

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false,
      }}>
      <section className="page-wrapper">
        <LangNav />
        <MenuNav />
        <LandingPage />
        <Hero />
        <SectionCollection />
        <SectionQuote />
        <Footer />
      </section>
    </ReactLenis>
  )
}

export default App
