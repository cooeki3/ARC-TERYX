
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react';


import "./css/style.css";
import 'lenis/dist/lenis.css'

import LandingPage from './components/LandingPage.jsx';
import Hero from './components/Hero.jsx';
import LangNav from './components/LangNav.jsx';
import MenuNav from './components/MenuNav.jsx';
import SectionCollection from './components/SectionCollection.jsx';
import Footer from './components/Footer.jsx';
function App() {

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
      }}
    >
      <section className="page-wrapper">
        <Hero />
        <LandingPage />
        <MenuNav />
        <LangNav />
        <SectionCollection />
        <Footer />
      </section>
    </ReactLenis>
  )
}

export default App
