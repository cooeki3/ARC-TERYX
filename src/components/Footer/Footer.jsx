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
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

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
          <div className="logo-socials-container">
            <a href="">
              <Logo className='footer-logo' />
            </a>
            <div className="footer-socials">
              <a href=""><FaInstagram className='social-icon' /></a>
              <a href=""><FaFacebookF className='social-icon' /></a>
              <a href=""><FaXTwitter className='social-icon' /></a>
            </div>
          </div>

          <div className='footer-links'>
            <div className="footer-col link-hover-anim">
              <h4>Explore</h4>
              <a href="#home">Home</a>
              <a href="#collection">New Collection</a>
              <a href="#about">About Us</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="footer-col link-hover-anim">
              <h4>Contact</h4>
              <a href="#contact">Contact</a>
              <p>Arc'teryx HQ</p>
              <a href='https://maps.app.goo.gl/wMi11QeTpfH1MoUC9' target="_blank">
                2220 Dollarton Hwy #110,<br />
                North Vancouver, BC
                V7H 3A7</a>
              <a href='mailto:info@arcteryx.com'>info@arcteryx.com</a>
            </div>

            <div className="footer-col link-hover-anim">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Terms & Conditions</a>
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
            {/* <div className="footer-socials">
              <a href=""><FaInstagram className='social-icon' /></a>
              <a href=""><FaFacebookF className='social-icon' /></a>
              <a href=""><FaXTwitter className='social-icon' /></a>
            </div> */}
            {/* <button className="footer-button">
              <span className='button-text'>Contact us</span>
              <span className="material-symbols-outlined">
                arrow_outward
              </span>
            </button> */}
          </div>
          <div className="footer-row-2-2">
            {/* <hr /> */}
          </div>
          <div className="bottom-links link-hover-anim">
            {/* <a href="">Privacy policy</a>
            <span>/</span>
            <a href="">Cookie policy</a>
            <span>/</span>
            <a href="">Terms & conditions</a>
            <span>/</span> */}
            <a href="">[ Site by Alexandre Gratton ]</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
