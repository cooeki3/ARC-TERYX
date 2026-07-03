
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger.js';

// Swiper
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


gsap.registerPlugin(SplitText, ScrollTrigger);

function SectionCollection() {

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
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
    return () => swiper.destroy(true, true);
  }, [])

  return (
    <div className='section-collection'>
      <div className='section-collection-text'>
        <h1 className='section-collection-h1'>Spring summer ‘26 collection</h1>
        {/* <div className='section-collection-p'>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </div> */}
        <button className='section-collection-button'>Learn more</button>
      </div>

      <div className='section-collection-swiper swiper'>
        <div className="swiper-wrapper">

          {/* 1st slide */}
          <div className='section-collection-card swiper-slide'>
            <img
              src="../../images/ARTCTERYX_swiper_product_01.png" alt="Bird Head Toque hat"
              className="section-collection-card-bg" />
            <div className='section-collection-card-description'>
              <div className='section-collection-card-text'>
                <div className='section-collection-product-tag'>Footwear</div>
                <div className='section-collection-product-name'>Bird Head Toque</div>
                <div className='section-collection-product-price'>$60.00</div>
              </div>
              <button className='section-collection-product-add-button'>+</button>
            </div>
          </div>

          {/* 2nd slide */}
          <div className='section-collection-card swiper-slide'>
            <img
              src="../../images/ARTCTERYX_swiper_product_02.png" alt="Bird Head Toque Headband"
              className="section-collection-card-bg" />
            <div className='section-collection-card-description'>
              <div className='section-collection-card-text'>
                <div className='section-collection-product-tag'>Accessory</div>
                <div className='section-collection-product-name'>Bird Head Headband</div>
                <div className='section-collection-product-price'>$30.00</div>
              </div>
              <button className='section-collection-product-add-button'>+</button>
            </div>
          </div>

          {/* 3rd slide */}
          <div className='section-collection-card swiper-slide'>
            <img
              src="../../images/ARTCTERYX_swiper_product_03.png" alt="Bird Head Toque Headband"
              className="section-collection-card-bg" />
            <div className='section-collection-card-description'>
              <div className='section-collection-card-text'>
                <div className='section-collection-product-tag'>Accessory</div>
                <div className='section-collection-product-name'>Bird Head Headband</div>
                <div className='section-collection-product-price'>$30.00</div>
              </div>
              <button className='section-collection-product-add-button'>+</button>
            </div>
          </div>

          {/* 4th slide */}
          <div className='section-collection-card swiper-slide'>
            <img
              src="../../images/ARTCTERYX_swiper_product_04.png" alt="Bird Head Toque Headband"
              className="section-collection-card-bg" />
            <div className='section-collection-card-description'>
              <div className='section-collection-card-text'>
                <div className='section-collection-product-tag'>Accessory</div>
                <div className='section-collection-product-name'>Bird Head Headband</div>
                <div className='section-collection-product-price'>$30.00</div>
              </div>
              <button className='section-collection-product-add-button'>+</button>
            </div>
          </div>

          {/* 5th slide */}
          <div className='section-collection-card swiper-slide'>
            <img
              src="../../images/ARTCTERYX_swiper_product_05.png" alt="Bird Head Toque Headband"
              className="section-collection-card-bg" />
            <div className='section-collection-card-description'>
              <div className='section-collection-card-text'>
                <div className='section-collection-product-tag'>Accessory</div>
                <div className='section-collection-product-name'>Bird Head Headband</div>
                <div className='section-collection-product-price'>$30.00</div>
              </div>
              <button className='section-collection-product-add-button'>+</button>
            </div>
          </div>
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
