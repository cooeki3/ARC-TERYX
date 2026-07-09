// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

function Hero() {

  return (
    <div className='section-hero' data-logo='white'>
      <img src="../../images/BG_Hero.png" alt="" />
      <div className='text-container'>
        <h1><span>Feel</span> the quality</h1>
        <p>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
      </div>
    </div>
  )
}

export default Hero
