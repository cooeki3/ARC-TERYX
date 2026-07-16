// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Components imports
import Home from './pages/Home';

// Lenis imports
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

function App() {
  // ------------------------------------Lenis ini.-------------------------------
  const lenis = useLenis((lenis) => { })
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis]);
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          wheelMultiplier: 1,
          syncTouch: false,
        }}>
        <Home
        />
      </ReactLenis>
    </>
  )
}

export default App
