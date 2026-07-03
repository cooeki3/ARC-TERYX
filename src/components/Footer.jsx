
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(SplitText, ScrollTrigger, useEffect);



function Footer() {



  return (
    <footer className='section-footer'>
      <div className="footer-row-1">
        <a href=""><img src="../../images/ARCTERYX_logo.png" alt="Arc'teryx logo" className="footer-logo" /></a>
        <div className='footer-links'>
          <div class="footer-col">
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

          <div class="footer-col">
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

          <div class="footer-col">
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

          <div class="footer-col">
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
            <button><span class="material-symbols-outlined">
              arrow_outward
            </span></button>
          </div>
        </div>

      </div>

      <div className="footer-row-2 ">
        <div className="footer-socials">
          <img src="../../images/Icon_Instagram.png" alt="Instagram icon" />
          <img src="../../images/Icon_Facebook.png" alt="Facebook icon" />
          <img src="../../images/Icon_X.png" alt="X icon" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
