
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(SplitText, ScrollTrigger, useEffect);



function Hero() {



  return (
    <div className='section-hero'>
      <img src="../image/s" alt="" />
    </div>
  )
}

export default Hero
