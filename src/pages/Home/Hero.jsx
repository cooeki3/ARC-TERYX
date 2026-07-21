// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';


// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Other imports:
import {
  imageHeroBackground,
} from "../../assets/images";
import {
  videoHero,
} from "../../assets/videos";

function Hero({ heroTitleRef, heroPRef }) {

  return (
    <div className='section-hero' data-logo='white'>
      {/* <img src={imageHeroBackground} className='hero-bg' alt="Home background" /> */}
      <div className="hero-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 2;
          }}
          className='landing-video'
        >
          <source src={videoHero} type="video/mp4" />
        </video>
      </div>
      <div
        className='text-container'
      >
        <h1 ref={heroTitleRef}><span>Feel</span> the quality</h1>
        <p ref={heroPRef}>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
      </div>
    </div>
  )
}

export default Hero
