
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react';


import "./css/style.css";
import 'lenis/dist/lenis.css'

import LandingPage from './components/LandingPage.jsx';
import Hero from './components/Hero.jsx';
import Menu from './components/Menu.jsx';
import Section1 from './components/Section1.jsx';

import Nav from './components/Nav.jsx';
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
        <Menu></Menu>
        <Nav />
        <Section1 />
      </section>
    </ReactLenis>
  )
}

export default App
