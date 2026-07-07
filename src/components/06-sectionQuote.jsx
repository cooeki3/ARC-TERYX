// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

function Quote() {
  const quoteRef = useRef();
  const textContainerRef = useRef();
  useEffect(() => {

    const split = new SplitText(quoteRef.current, {
      type: 'words, chars, lines',
      mask: 'lines'
    });
    // Y and mask anim.
    gsap.fromTo(split.lines, {
      yPercent: 100
    }, {
      yPercent: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: '.h4-quote',
        start: 'top 80%',
        // for tests:
        toggleActions: "restart none none reset"
      }

    })
    // H1 Opacity animation
    gsap.fromTo(split.chars,
      {
        color: '#B0B0A9'
      },
      {
        color: '#fff',
        stagger: 0.05,
        duration: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.h4-quote',
          start: "top 90%",
          end: 'top 30%',
          scrub: 1,
        }
      })
  }, [])
  return (
    <div className='section-quote'>
      <div className="quote-text-container" ref={textContainerRef}>
        <h4 className='h4-quote'>About us</h4>
        <h1 className='h1-quote' ref={quoteRef}>Crafted for those who seek the extraordinary. Designed with uncompromising materials for every adventure.</h1>
      </div>
    </div>
  )
}

export default Quote
