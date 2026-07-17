// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);

function Template() {

  return (
    <div className='section-template'></div>
  )
}

export default Template
