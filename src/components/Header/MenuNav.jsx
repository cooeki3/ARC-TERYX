// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';


// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Other imports
import { useLenis } from 'lenis/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);


function MenuNav() {
    const lenis = useLenis();

    useEffect(() => {
        //menu. Dropdown hover animation
        const menuDropdown = document.querySelector(".nav__menu-dropdown");
        const menuDropdownBelow = document.querySelector(".nav__menu-dropdown-below");
        const customEase = CustomEase.create(
            "custom",
            "M0,0 C0.11,0.494 0.135,0.637 0.266,0.798 0.368,0.924 0.504,1 1,1"
        );
        const menu__navItems = new SplitText('.dropdown__menu-container > li', {
            type: 'words',
            mask: 'words',
        })

        //Solve the mask not being large enough and cutting 1-2px off the right of every li
        menu__navItems.words.forEach(word => {
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
            gsap.to(menuDropdown, {
                width: width,
                duration: 0.6,
                ease: customEase,
                overwrite: "auto"
            });
            gsap.to(menuDropdownBelow, {
                width: width,
                duration: 0.6,
                ease: customEase,
                overwrite: "auto"
            });
        };

        const animateHeight = (height, radius, padding, enter) => {
            gsap.to(menuDropdownBelow, {
                height: height,
                borderRadius: radius,
                duration: 0.4,
                ease: customEase,
                overwrite: "auto"
            });
            //Ajout de 5px de padding pour simuler le margin des autres boutons
            gsap.to(menuDropdown, {
                padding: padding,
                duration: 0.9,
                ease: customEase,
                overwrite: "auto"
            });

            //Anim. de l'apparition des autres menuues entrée
            if (enter) {
                gsap.fromTo(menu__navItems.words,
                    {
                        yPercent: 100,
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

        //Apelle des animations pour ouvrir le dropdown menu
        const onEnter = () => {
            animateWidth(250);
            animateHeight(368, '0.8rem', '1rem 1rem', true); //Ajouter ou soustraire 62px au height du menu pour ajouter ou enlever un item du menu
        }
        const onLeave = () => {
            animateWidth(95);
            animateHeight(40, '1.3rem', '0.7rem 1rem', false);
        }

        menuDropdownBelow.addEventListener("mouseenter", onEnter);
        menuDropdownBelow.addEventListener("mouseleave", onLeave);
    }, []);

    // ScrollTo
    const menuButtons = document.querySelectorAll(".dropdown__menu-container li");

    const handleScroll = (e) => {
        const target = e.currentTarget.dataset.target;

        lenis?.scrollTo(target, {
            duration: 1,
        });
    };

    menuButtons.forEach(button => {
        button.addEventListener("click", handleScroll);
    });

    return (
        <nav className='section-menu__nav' id='nav'>
            <div className='nav__menu-dropdown '>
                <div className="dropdown__text">Menu</div>
                <div className="dropdown__circles">
                    <span className='dropdown__circle-01'></span>
                    <span className='dropdown__circle-02'></span>
                </div>
            </div>
            <div className='nav__menu-dropdown-below'>
                <ul className="dropdown__menu-container">
                    <li className='menu-button-contact' data-target=".section-footer">Contact</li>
                    <li className='menu-button-projets' data-target=".section-faq">FAQ</li>
                    <li className='menu-button-services' data-target=".section-quote">About us</li>
                    <li className='menu-button-collection' data-target=".section-collection">New collection</li>
                    <li className='menu-button-home' data-target=".section-hero">Home</li>
                </ul>
            </div>
        </nav>
    )
}
export default MenuNav;
