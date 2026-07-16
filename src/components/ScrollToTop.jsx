// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Lenis imports
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'


function ScrollToTop() {

    const lenis = useLenis();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        if (!lenis) return;
        lenis.scrollTo(0, { immediate: true, force: true });
    }, [lenis]);
}

export default ScrollToTop