
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(SplitText, ScrollTrigger);

function Section1() {

  return (
   <div className='section-1'></div>
  )
}

export default Section1;
