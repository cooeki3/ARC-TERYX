// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";
import Logo from "../assets/ARCTERYX_text_logo.svg?react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);

function Template() {

  return (
    <div className='section-template'></div>
  )
}

export default Template
