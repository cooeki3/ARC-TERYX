// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from "gsap/GSDevTools";
import Logo from "../../assets/images/ARCTERYX_text_logo.svg?react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);


function TopNav({ langMenuRef, miniLogoRef, backdropRef, sectionCollectionRef }) {
    // ------------------------------Lang. Dropdown  anims.-----------------------------
    useLayoutEffect(() => {
        //Lang. Dropdown hover animation
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

        //Solve the mask not being large enough and cutting 1-2px off the right of every li
        lang__navItems.words.forEach(word => {
            const mask = word.parentElement;
            mask.style.paddingRight = '0.1em';
            mask.style.marginRight = '-0.1em';
        });

        //Set les cercle pour animation d'entrée et de sortie
        gsap.set('.dropdown__circle-01', {
            yPercent: -100
        })

        gsap.set('.dropdown__circle-02', {
            yPercent: 100
        })

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

        const animateHeight = (height, radius, padding, enter) => {
            gsap.to(langDropdownBelow, {
                height: height,
                // borderRadius: radius,
                duration: 0.6,
                ease: customEase,
                overwrite: "auto"
            });
            //Ajout de 5px de padding pour simuler le margin des autres boutons
            gsap.to(langDropdown, {
                padding: padding,
                duration: 0.9,
                ease: customEase,
                overwrite: "auto"
            });

            //Anim. de l'apparition des autres langues entrée
            if (enter) {
                gsap.fromTo(lang__navItems.words,
                    {
                        yPercent: 150,
                        opacity: 1,
                    },
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: 'power4.out',
                        stagger: 0.05,
                        overwrite: true,
                    }
                )

                //Animation des cercles entrée
                //Cleanup
                gsap.killTweensOf('.dropdown__circle-01');
                gsap.killTweensOf('.dropdown__circle-02');
                gsap.killTweensOf('.dropdown__circles');
                const tl = gsap.timeline();
                tl.to('.dropdown__circle-01', {
                    yPercent: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, 0)

                tl.to('.dropdown__circle-02', {
                    yPercent: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, 0)

                tl.to('.dropdown__circles', {
                    rotate: '90deg',
                    duration: 0.5,
                    ease: 'power3.out',
                }, 0)

                tl.to('.dropdown__circle-01', {

                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power3.out',
                }, 0.4)

                tl.to('.dropdown__circle-02', {

                    yPercent: 100,
                    duration: 0.8,
                    ease: 'power3.out',
                }, 0.4)
            }

            else {
                //Animation des cercles sortie
                //Cleanup
                gsap.killTweensOf('.dropdown__circle-01');
                gsap.killTweensOf('.dropdown__circle-02');
                gsap.killTweensOf('.dropdown__circles');
                const tl = gsap.timeline();

                tl.to('.dropdown__circle-01', {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power3.out',
                }, 0)

                tl.to('.dropdown__circle-02', {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power3.out',
                }, 0)

                tl.to('.dropdown__circles', {
                    rotate: '0deg',
                    duration: 0.5,
                    ease: 'power3.out',
                }, 0.4)

                tl.to('.dropdown__circle-01', {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power3.out',
                }, 0.4)

                tl.to('.dropdown__circle-02', {
                    yPercent: 100,
                    duration: 1,
                    ease: 'power3.out',
                }, 0.4)
            }
        };

        // function initLogoScrollTriggers() {
        //     const sections = gsap.utils.toArray("[data-logo]");

        //     sections.forEach((section, index) => {
        //         ScrollTrigger.create({
        //             trigger: section,
        //             start: "top 3%",

        //             onEnter: () => changeLogo(section.dataset.logo),

        //             onLeaveBack: () => {
        //                 const previous = sections[index - 1];

        //                 if (previous) {
        //                     changeLogo(previous.dataset.logo);
        //                 }
        //             }
        //         });
        //     });

        //     function changeLogo(theme) {
        //         gsap.to(miniLogoRef.current.querySelectorAll('path, polygon'), {
        //             fill: theme === 'black' ?
        //                 '#000'
        //                 : '#fff',
        //             duration: 0.6,
        //             ease: 'power4.out'
        //         })
        //     }
        // }


        //Apelle des animations pour ouvrir le dropdown languages
        const onEnter = () => {
            animateWidth(210);
            animateHeight(478, '0.8rem', '1rem 1rem', true);
        }
        const onLeave = () => {
            animateWidth(125);
            animateHeight(40, '1.3rem', '0.7rem 1rem', false);
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
        <>
            <nav className='section-lang__nav' id='nav'>
                <div className="1stNavElement"></div>
                <Logo
                    alt="Arc'teryx Logo"
                    className='text-logo'
                    ref={miniLogoRef}
                />
                <div
                    className="nav__lang-dropdown-container"
                    ref={langMenuRef}
                >
                    <div className='nav__lang-dropdown '>
                        <div className="dropdown__text">Français</div>
                        <div className="dropdown__circles">
                            <span className='dropdown__circle-01'></span>
                            <span className='dropdown__circle-02'></span>
                        </div>
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
                </div>
            </nav>
        </>
    )
}
export default TopNav;
