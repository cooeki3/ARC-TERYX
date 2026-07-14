// React imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// GSAP imports
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import GSDevTools from 'gsap/GSDevTools';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, GSDevTools);

function Quote() {
  const quoteRef = useRef();
  const textContainerRef = useRef();
  const faqH1Ref = useRef();
  const faqPRef = useRef();
  const questionRefs = useRef([]);

  const answerRefs = useRef([]);
  const iconRefs = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);

  // Faq
  const faqs = [
    {
      question: 'When does the 2026 collection release and where can I shop it?',
      answer: 'The 2026 collection launches in stages starting this spring, with core pieces available online and in select flagship stores. Sign up for our newsletter to get early access before the general release.'
    },
    {
      question: 'What technology defines the 2026 collection?',
      answer: 'The 2026 collection features our updated GORE-TEX PRO fabric with a lighter face fabric, improving breathability by 12% while maintaining full waterproof and windproof protection. Every seam is fully taped and tested to withstand sustained alpine conditions.'
    },
    {
      question: 'What if my jacket doesn\'t fit right?',
      answer: 'We offer free exchanges within 30 days of delivery on all unworn items with tags attached. If you\'re between sizes, our size guide includes recommendations based on intended layering, so you can size up or down with confidence before ordering.'
    },
    {
      question: 'Is this collection sustainably made?',
      answer: 'Yes. The 2026 collection uses bluesign-approved fabrics and recycled face materials wherever performance allows. We\'ve also expanded our ReBIRD program, so any piece in this collection can be repaired, resold, or recycled through our take-back service.'
    },
    {
      question: 'What happens if something breaks?',
      answer: 'Every piece is backed by our Rock Solid Guarantee, so if a defect in materials or workmanship shows up, we\'ll repair or replace it at no cost. For general wear and tear, our repair service can extend the life of your gear well beyond the original purchase.'
    },
    {
      question: 'How do I care for GORE-TEX PRO garments?',
      answer: 'Machine wash cold on a gentle cycle with technical wash (never fabric softener), then tumble dry on low heat to reactivate the DWR coating. Avoid dry cleaning. We recommend washing after every 5-10 wears or whenever water stops beading on the surface.'
    },
  ];


  const toggleFaq = (index) => {
    // When clicking on an index, checks if its the current opened index
    const isOpening = openIndex !== index;

    // Close the currently opened index (if any)
    if (openIndex !== null && openIndex !== index) {
      const prevEl = answerRefs.current[openIndex];
      const prevElIcon = iconRefs.current[openIndex];
      gsap.to(prevEl, {
        height: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
      gsap.to(prevElIcon, {
        rotation: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
    }

    const el = answerRefs.current[index];
    const icon = iconRefs.current[index];

    if (isOpening) {
      gsap.set(el, {
        height: 'auto'
      })
      const fullHeight = el.offsetHeight;
      gsap.fromTo(el, {
        height: 0
      },
        {
          height: fullHeight,
          duration: 0.7,
          ease: 'power4.out'
        })
      gsap.to(icon, {
        rotation: 45,
        duration: 0.7,
        ease: 'power4.out',
      })
      setOpenIndex(index);

    } else {
      gsap.to(el,
        {
          height: 0,
          duration: 0.7,
          ease: 'power4.out'
        })
      gsap.to(icon, {
        rotation: 0,
        duration: 0.7,
        ease: 'power4.out',
      })
      setOpenIndex(null);
    }
  }

  // Entrance animations
  useEffect(() => {
    const quoteSplit = new SplitText(quoteRef.current, {
      type: 'words, chars, lines',
      mask: 'lines',
    });

    const faqHeadingSplit = new SplitText(faqH1Ref.current, {
      type: 'lines',
      mask: 'lines',
    });

    const faqParagraphSplit = new SplitText(faqPRef.current, {
      type: 'lines',
      mask: 'lines',
    });

    const fullIntroLines = [...faqHeadingSplit.lines, ...faqParagraphSplit.lines];

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-faq',
        start: 'top 80%',
        toggleActions: "restart none none reset",
      }
    });



    tl.fromTo(fullIntroLines, {
      yPercent: 100
    }, {
      yPercent: 0,
      duration: 1.3,
      ease: 'power4.out',
      stagger: 0.08,
    });

    questionRefs.current.forEach((question, i) => {
      const questionSplit = new SplitText(question, {
        type: 'lines',
        mask: 'lines',
      });

      tl.fromTo(questionSplit.lines, {
        yPercent: 100
      }, {
        yPercent: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
      }, 0.4 + i * 0.10);

      tl.fromTo(question.closest('.faq-item'), {
        '--after-scale': 0,
      }, {
        '--after-scale': 1,
        duration: 0.9,
        ease: 'power4.out'
      }, 0.4 + i * 0.10);

      tl.fromTo((iconRefs.current[i]), {
        rotation: -45,
      }, {
        rotation: 0,
        duration: 0.6,
        ease: "power4.out",
      }, 1 + i * 0.12);

      tl.fromTo((iconRefs.current[i]), {
        scale: 0,
      }, {
        scale: 1,
        duration: 1,
        ease: "power4.out",
      }, 1 + i * 0.10);

    });
    // GSDevTools.create({
    //   animation: tl,
    // });

    // Y and mask anim.
    gsap.fromTo(quoteSplit.lines, {
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
    gsap.fromTo(quoteSplit.chars,
      {
        color: '#B0B0A9'
      },
      {
        color: '#fff',
        stagger: 0.05,
        duration: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.h4-quote',
          start: "top 70%",
          end: 'top 25%',
          scrub: 1,
        }
      })


    // Outro grid anim.
    gsap.fromTo('.outro-anim-grid-container > *', {
      transform: 'scaleY(0)',
    }, {
      transform: 'scaleY(1)',
      duration: 1,
      ease: 'power1.out',
      stagger: -0.1,
      scrollTrigger: {
        trigger: '.outro-anim-grid-container',
        start: 'top top',
        end: 'bottom 20%',
        scrub: true,
      }
    })
  }, [])

  return (
    <>
      <div className='section-quote' data-logo='white'>
        <div className="quote-text-container" ref={textContainerRef}>
          <h4 className='h4-quote'>About us</h4>
          <h1 className='h1-quote' ref={quoteRef}>Crafted for those who seek the extraordinary. Designed with uncompromising materials for every adventure.</h1>
        </div>

        <div className='section-faq'>
          {/* Left column */}
          <div className='faq-intro'>
            <h1 ref={faqH1Ref}>Frequently asked
              questions</h1>
            <p ref={faqPRef}>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
          </div>
          {/* Right column */}
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className="faq-item"
                key={index}
              >
                <button className="faq-summary" onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}>
                  <span ref={(el) => (questionRefs.current[index] = el)}>{faq.question}</span>
                  <span
                    className="material-symbols-outlined faq-icon"
                    ref={(el) => (iconRefs.current[index] = el)}
                  >
                    add_2
                  </span>
                </button>
                <div className="faq-answer"
                  ref={(el) => (answerRefs.current[index] = el)}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='outro-anim-grid-container' data-logo='black'>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
          <div className='outro-anim-row'></div>
        </div>
      </div >
    </>
  )
}

export default Quote
