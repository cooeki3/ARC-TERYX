// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import CollectionCard from '../../components/CollectionCard';

// Swiper imports
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Other imports
import {
  imageARCTERYXProduct01,
  imageARCTERYXProduct02,
  imageARCTERYXProduct03,
  imageARCTERYXProduct04,
  imageARCTERYXProduct05
} from "../../assets/images";

function SectionCollection() {
  const sectionCollectionRef = useRef();

  useLayoutEffect(() => {
    //Initialize the swiper
    const swiper = new Swiper('.section-collection-swiper', {
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 20,
      speed: 500,
      resistance: true,
      resistanceRatio: 0.85,
      navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });
    // --------------------------------Scroll scale anim.------------------

    gsap.fromTo(sectionCollectionRef.current, {
      yPercent: '30',
      scale: 0.8,
      borderRadius: '100px'
    }, {
      yPercent: '-40',
      scale: 1,
      borderRadius: '0px',
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,

        onComplete: () => {
          ScrollTrigger.refresh();
        },
      }
    })
    gsap.fromTo('.section-hero', {
      filter: 'brightness(1) blur(0px)',
    }, {
      filter: 'brightness(0.5) blur(3px)',
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    ScrollTrigger.create({
      trigger: ".section-hero",
      start: "bottom top",

      onEnter: () => {
        gsap.set("body", {
          backgroundColor: "#fff"
        });
      },

      onLeaveBack: () => {
        gsap.set("body", {
          backgroundColor: "#000"
        });
      }
    });

    // --------------------------------Intro anim.-------------------------
    // Tl for anim
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-hero",
        start: "bottom bottom",
        toggleActions: "restart none none reset"
      },
    })


    // H1 anim
    tl.fromTo(
      ".section-collection-text",
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
      }, 0
    )

    // Slide up anim
    tl.fromTo(
      ".section-collection-swiper .swiper-slide",
      {
        yPercent: 30,
      },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.04,
      }, 0
    )

    // Text opacity anim
    tl.fromTo(
      ".section-collection-card-text",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.5,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.04,
      }, 0
    )

    // Add button scale anim
    tl.fromTo(
      ".section-collection-product-add-button",
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        delay: 0.5,
        duration: 1.6,
        ease: "elastic.out(1.5,0.75)",
        stagger: 0.08,
        clearProps: "transform"
      }, 0
    )
    // Pagination y and opacity animation
    tl.fromTo(
      ".swiper-pagination",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.4,
        duration: 0.3,
        ease: "power4.out",
      }, 0
    )
    // ScrollTrigger.refresh();
    return () => swiper.destroy(true, true);
  }, [])

  return (
    <div className='section-collection' ref={sectionCollectionRef} data-logo='black'>
      <div className='section-collection-text'>
        <h1 className='section-collection-h1'>Spring summer ‘26 collection</h1>
        {/* <div className='section-collection-p'>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </div> */}
        <button className='section-collection-button'>Learn more</button>
      </div>

      <div className='section-collection-swiper swiper'>
        <div className="swiper-wrapper">

          {/* Slides */}
          <CollectionCard
            src={imageARCTERYXProduct04}
            tag='Accessories'
            name='Bird Head Toque'
            price='$70.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct02}
            tag='Accessories'
            name='Satoro Merino Headband'
            price='$50.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct01}
            tag='Footwear'
            name='Sylan 2 Shoe'
            price='$280.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct05}
            tag='Accessories'
            name='Sinsola Short Brim Bucket Hat'
            price='$110.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct03}
            tag='Accessories'
            name='Silex Cap'
            price='$0.00'
          />

        </div>

        <div className="swiper-pagination">
          <div className="swiper-scrollbar"></div>
          <div className="arrows-controls">
            <div className="swiper-btn-prev">  <span className="material-symbols-outlined">arrow_back</span></div>
            <div className="swiper-btn-next">  <span className="material-symbols-outlined">arrow_forward</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionCollection;
