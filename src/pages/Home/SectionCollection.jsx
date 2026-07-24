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

function SectionCollection({ sectionCollectionRef }) {
  const collectionH1Ref = useRef();
  const collectionBtnRef = useRef();

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
      // borderRadius: '100px'
    }, {
      yPercent: '-40',
      scale: 1,
      // borderRadius: '0px',
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
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
    gsap.fromTo('.landing-logo-container', {
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
    const collectionH1Split = new SplitText(collectionH1Ref.current, {
      type: 'lines',
      mask: 'lines',
    });

    const collectionBtnSplit = new SplitText(collectionBtnRef.current, {
      type: 'lines',
      mask: 'lines',
    });

    // Tl for anim
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-hero",
        start: "bottom bottom",
        toggleActions: "restart none none reset"
      },
    })


    // H1 anim
    tl.fromTo(collectionH1Split.lines,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,

        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
      }, 0.3
    )

    tl.fromTo(collectionBtnRef.current,
      {
        transform: 'scaleX(0)',
        opacity: 0,
        yPercent: 100,
      },
      {
        transform: 'scaleX(1)',
        opacity: 1,
        yPercent: 0,

        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
      }, 0.3
    )

    tl.fromTo(collectionBtnSplit.lines,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,

        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
      }, 0.9
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

    // Add button scale anim
    tl.fromTo(
      ".product-add-button",
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

    // Cards hover anim.
    const cards = document.querySelectorAll('.section-collection-card');

    cards.forEach((card) => {
      const cardImg = card.querySelector('.section-collection-card-bg');
      const cardImgHoverScale = card.querySelector('.scale-wrapper');
      const cardImgHoverOpacity = card.querySelector('.opacity-wrapper');

      gsap.set(cardImgHoverOpacity, {
        opacity: 0
      });
      gsap.set(cardImgHoverScale, {
        scale: 0.4
      });

      const hoverIn = () => {
        gsap.to(cardImg, {
          scale: 1.2,
          filter: 'brightness(0.8) blur(2px)',
          duration: 1,
          ease: 'power4.out',
          overwrite: true
        })

        gsap.to(cardImgHoverOpacity, {
          opacity: 1,
          duration: 0.4,
          ease: 'power4.out',
          overwrite: true
        })

        gsap.to(cardImgHoverScale, {
          scale: 0.7,
          duration: 1.1,
          ease: 'power4.out',
          overwrite: true
        })
      }

      const hoverOut = () => {
        gsap.to(cardImg, {
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          duration: 0.8,
          ease: 'power4.out',
          overwrite: true
        })

        gsap.to(cardImgHoverOpacity, {
          opacity: 0,
          duration: 0.4,
          ease: 'power4.out',
          overwrite: true
        })

        gsap.to(cardImgHoverScale, {
          scale: 0.4,
          duration: 0.6,
          ease: 'power4.out',
          overwrite: true
        })
      }

      card.addEventListener('mouseenter', hoverIn);
      card.addEventListener('mouseleave', hoverOut);
    })

    // ScrollTrigger.refresh();
    return () => swiper.destroy(true, true);
  }, [])

  return (
    <div className='section-collection' ref={sectionCollectionRef} data-logo='black'>
      <div className='section-collection-text'>
        <h1 className='section-collection-h1' ref={collectionH1Ref}>Winter ‘26 collection</h1>
        {/* <div className='section-collection-p'>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </div> */}
        <button className='section-collection-button' ref={collectionBtnRef}>Learn more</button>
      </div>

      <div className='section-collection-swiper swiper'>
        <div className="swiper-wrapper">

          {/* Slides */}
          <CollectionCard
            src={imageARCTERYXProduct04}
            hoverSrc={imageARCTERYXProduct04}
            tag='Accessories'
            name='Bird Head Toque'
            price='$70.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct02}
            hoverSrc={imageARCTERYXProduct02}
            tag='Accessories'
            name='Satoro Merino Headband'
            price='$50.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct01}
            hoverSrc={imageARCTERYXProduct01}
            tag='Footwear'
            name='Sylan 2 Shoe'
            price='$280.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct05}
            hoverSrc={imageARCTERYXProduct05}
            tag='Accessories'
            name='Sinsola Short Brim Bucket Hat'
            price='$110.00'
          />
          <CollectionCard
            src={imageARCTERYXProduct03}
            hoverSrc={imageARCTERYXProduct03}
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
