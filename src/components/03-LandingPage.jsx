// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
// import { GSDevTools } from 'gsap/GSDevTools';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

function LandingPage() {
    // const lenis = useLenis()

    // useEffect(() => {
    //     if (!lenis) return
    //     CustomEase.create("custom01", "M0,0 C0.11,0.494 0.288,0.776 0.428,0.89 0.577,1.01 0.829,1 1,1 ")
    //     let tl = gsap.timeline();
    //     lenis.stop() ## etait pour stop le scroll pendant la landing page animation :p !!
    // },
    //     [lenis]);

    return (
        <div className='section-landing-page'></div>
    )
}

export default LandingPage;
