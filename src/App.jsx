// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Components imports
import Index from './pages/Home/Index.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Lenis imports
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

// Fonts
import "@fontsource-variable/geist";

function App() {
  // Check Mobile Click
  // useEffect(() => {
  //   const logTarget = (e) => {
  //     const el = document.elementFromPoint(e.clientX, e.clientY);
  //     alert(el?.className || el?.tagName || 'nothing found');
  //   };
  //   document.addEventListener('click', logTarget, true);
  //   return () => document.removeEventListener('click', logTarget, true);
  // }, []);
  // ------------------------------------Lenis ini.-------------------------------
  const lenis = useLenis((lenis) => { })
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          wheelMultiplier: 1,
          syncTouch: false,
        }}>

        {/* <ScrollToTop /> */}
        <Index />
      </ReactLenis>
    </>
  )
}

export default App
