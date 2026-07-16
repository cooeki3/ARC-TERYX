// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Components imports
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop.jsx';

// Lenis imports
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

function App() {
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

        <ScrollToTop />
        <Home />
      </ReactLenis>
    </>
  )
}

export default App
