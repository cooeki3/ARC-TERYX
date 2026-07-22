// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Other imports
import { useLenis } from 'lenis/react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Other imports
import DotGrid from '../DotGrid';
import Logo from "../../assets/images/ARCTERYX_logo.svg?react";

import {
  imageFacebookIcon,
  imageInstagramIcon,
  imageXIcon,
  imageARCTERYXLogo,
} from "../../assets/images";

function Footer() {

  return (
    <footer className='section-footer' data-logo='black'>
      <div className="footer-inner">
        <DotGrid />
        <div className="footer-row-1">
          <a href=""> <Logo className='footer-logo' /></a>
          <div className='footer-links'>
            <div className="footer-col link-hover-anim">
              <h4>Shop</h4>
              <a href="#">New Arrivals</a>
              <a href="#">Best Sellers</a>
              <a href="#">All Products</a>
              <a href="#">Backpacks</a>
              <a href="#">Camping</a>
              <a href="#">Survival Gear</a>
              <a href="#">Footwear</a>
              <a href="#">Accessories</a>
              <a href="#">Gift Cards</a>
              <a href="#">Sale</a>
            </div>
            <div className="footer-col link-hover-anim">
              <h4>Collections</h4>
              <a href="#">Winter Collection</a>
              <a href="#">Weekend Camping</a>
              <a href="#">Trail Running</a>
              <a href="#">Bushcraft</a>
              <a href="#">Travel Gear</a>
              <a href="#">Everyday Carry</a>
              <a href="#">Waterproof</a>
              <a href="#">Lightweight Picks</a>
              <a href="#">Premium Series</a>
            </div>
            <div className="footer-col link-hover-anim">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Our Story</a>
              <a href="#">Sustainability</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Press</a>
              <a href="#">Partners</a>
              <a href="#">Affiliates</a>
              <a href="#">Reviews</a>
              <a href="#">Store Locator</a>
            </div>
            <div className="footer-col link-hover-anim">
              <h4>Help</h4>
              <a href="#">Contact Us</a>
              <a href="#">FAQs</a>
              <a href="#">Shipping Information</a>
              <a href="#">Returns & Exchanges</a>
              <a href="#">Order Tracking</a>
              <a href="#">Warranty</a>
              <a href="#">Product Care</a>
              <a href="#">Size Guide</a>
              <a href="#">Payment Methods</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
          <div className="footer-newsletter">
            <h3>Join our newsletter</h3>
            <p>Keep up to date with new collections, events, discounts and more.</p>
            <div className="input-container">
              <input type="text" placeholder='Your email adress' />
              <button><span className="material-symbols-outlined">
                arrow_outward
              </span></button>
            </div>
          </div>
        </div>
        <div className="footer-row-2 ">
          <div className="footer-row-2-1">
            <div className="footer-socials">
              <a href=""><img src={imageInstagramIcon} alt="Instagram icon" /></a>
              <a href=""><img src={imageFacebookIcon} alt="Facebook icon" /></a>
              <a href=""><img src={imageXIcon} alt="X icon" /></a>
            </div>
            <button className="footer-button">
              <span className='button-text'>Contact us</span>
              <span className="material-symbols-outlined">
                arrow_outward
              </span></button>
          </div>
          <div className="footer-row-2-2">
            <hr />
          </div>
          <div className="bottom-links link-hover-anim">
            <a href="">Privacy policy</a>
            <a href="">Cookie policy</a>
            <a href="">Terms & conditions</a>
            <a href="">Site by Alexandre Gratton</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
