
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CustomEase from 'gsap/CustomEase';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

function Nav() {


    //Lang. Dropdown hover animation
    useEffect(() => {
        const langDropdown = document.querySelector(".nav__lang-dropdown");
        const langDropdownBelow = document.querySelector(".nav__lang-dropdown-below");
        const customEase = CustomEase.create(
            "custom",
            "M0,0 C0.11,0.494 0.135,0.637 0.266,0.798 0.368,0.924 0.504,1 1,1"
        );
        const lang__navItems = new SplitText('.dropdown__lang-container > li', {
            type: 'words',
            mask: 'words',
        })

        //Solve the maks being not large enough and cutting 1-2px off the right of every li
        lang__navItems.words.forEach(word => {
            const mask = word.parentElement;
            mask.style.paddingRight = '0.1em';
            mask.style.marginRight = '-0.1em';
        });



        const animateWidth = (width) => {
            gsap.to(langDropdown, {
                width: width,
                duration: 0.9,
                ease: customEase,
                overwrite: "auto"
            });
            gsap.to(langDropdownBelow, {
                width: width,
                duration: 0.9,
                ease: customEase,
                overwrite: "auto"
            });
        };
        const animateHeight = (height, radius, enter) => {
            gsap.to(langDropdownBelow, {
                height: height,
                borderRadius: radius,
                duration: 0.6,
                ease: customEase,
                overwrite: "auto"
            });
            if (enter) {
                gsap.fromTo(lang__navItems.words,
                    {
                        yPercent: 150,
                        opacity: 1,
                    },
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: customEase,
                        stagger: 0.05,
                        overwrite: true,
                    }
                )
            }
        };

        const onEnter = () => {
            animateWidth(200);
            animateHeight(455, '1.3rem', true);
        }
        const onLeave = () => {
            animateWidth(110);
            animateHeight(40, '1.3rem', false);
        }

        langDropdownBelow.addEventListener("mouseenter", onEnter);
        langDropdownBelow.addEventListener("mouseleave", onLeave);

        return () => {
            langDropdownBelow.removeEventListener("mouseenter", onEnter);
            langDropdownBelow.removeEventListener("mouseleave", onLeave);
            lang__navItems.revert();
        };
    }, []);

    return (
        <nav className='section-nav' id='nav'>
            <div className='nav__lang-dropdown '>
                <div className="dropdown__text">Français</div>
                <span className='dropdown__circle'></span>
            </div>
            <div className='nav__lang-dropdown-below'>
                <ul className="dropdown__lang-container">
                    <li>English</li>
                    <li>Español</li>
                    <li>Deutsch</li>
                    <li>Italiano</li>
                    <li>Polski</li>
                    <li>日本語</li>
                    <li>中文(中国)</li>
                    <li>Nederlands</li>
                    <li>Português</li>
                    <li>हिन्दी</li>
                    <li>English(Hong Kong)</li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
