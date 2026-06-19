
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CustomEase } from 'gsap/CustomEase';
import { useLenis } from 'lenis/react'
import ScrollTrigger from 'gsap/ScrollTrigger.js';
// import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(
    SplitText,
    ScrollTrigger,
    CustomEase,
    // GSDevTools
);

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
