"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS_DATA } from "@/lib/data";

export default function ServiceCards() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate underline SVG paths on scroll (from HeroSection)
    gsap.to(".title-underline-svg path", {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".service-cards-wrapper",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    const cleanupCards = initCardAnimations();
    return () => {
      if (cleanupCards) cleanupCards();
    };
  }, []);

  return (
    <>
      {/* ─── "the step-by-step plan:" Heading ─── */}
      <div className="title-container">
        <h2 className="main-title">
          the step-by-step <span className="italic-text">plan:</span>
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          viewBox="0 0 159 17"
          fill="none"
          className="title-underline-svg"
        >
          <path
            d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {/* ─── Service Cards ─── */}
      <div className="cards-wrapper" id="cards-wrapper">
        {CARDS_DATA.map((card) => (
          <div key={card.color} className={`card card-${card.color}`}>
            <div className="card-step-badge" aria-hidden="true">
              <span>{card.step}</span>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <svg
              width="100%"
              height="10"
              className="card-divider-svg"
              aria-hidden="true"
            >
              <use href="#card-divider" />
            </svg>
            <ul className="card-list">
              {card.services.map((service) => (
                <li key={service}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="16"
                    className="services-card__bullet-svg"
                    aria-hidden="true"
                  >
                    <use href="#bullet-icon" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function initCardAnimations() {
  const cards = gsap.utils.toArray(".card");
  if (!cards.length) return;

  const originalData = [
    { rotation: 4 },
    { rotation: -5 },
    { rotation: 5 },
    { rotation: -8 },
    { rotation: 5 },
  ];

  const mm = gsap.matchMedia();

  // Desktop (screens > 1024px)
  mm.add("(min-width: 1025px)", () => {
    const enterListeners = [];
    const leaveListeners = [];

    cards.forEach((card, index) => {
      const onEnter = () => {
        const hoverGap = 120;
        const clusterGap = 150;
        const cardWidth = 320;
        const hoveredLeft = cards[index].offsetLeft;
        const leftCards = [];
        const rightCards = [];

        cards.forEach((otherCard, otherIndex) => {
          if (otherIndex < index)
            leftCards.push({ card: otherCard, index: otherIndex });
          else if (otherIndex > index)
            rightCards.push({ card: otherCard, index: otherIndex });
        });

        const currentTop = cards[index].offsetTop;
        const targetCommonTop = 50;
        const moveY = targetCommonTop - currentTop;

        gsap.to(cards[index], {
          x: 0,
          y: moveY,
          rotation: 0,
          scale: 1.08,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          overwrite: true,
        });

        if (rightCards.length) {
          const clusterStart = hoveredLeft + cardWidth + hoverGap;
          rightCards.forEach((item, i) => {
            const targetAbsLeft = clusterStart + i * clusterGap;
            const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 10);
            const angleRad =
              originalData[item.index].rotation * (Math.PI / 180);
            const targetY = targetX * Math.tan(angleRad);
            gsap.to(item.card, {
              x: targetX,
              y: targetY,
              rotation: originalData[item.index].rotation,
              scale: 1,
              duration: 1.0,
              ease: "elastic.out(1, 0.5)",
              overwrite: true,
            });
          });
        }

        if (leftCards.length) {
          leftCards.reverse();
          const clusterStart = hoveredLeft - hoverGap - cardWidth;
          leftCards.forEach((item, i) => {
            const targetAbsLeft = clusterStart - i * clusterGap;
            const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -10);
            const angleRad =
              originalData[item.index].rotation * (Math.PI / 180);
            const targetY = targetX * Math.tan(angleRad);
            gsap.to(item.card, {
              x: targetX,
              y: targetY,
              rotation: originalData[item.index].rotation,
              scale: 1,
              duration: 1.0,
              ease: "elastic.out(1, 0.5)",
              overwrite: true,
            });
          });
        }
      };

      const onLeave = () => {
        cards.forEach((c, i) => {
          gsap.to(c, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: originalData[i].rotation,
            duration: 1.0,
            ease: "elastic.out(1, 0.5)",
            overwrite: true,
            zIndex: i + 1,
            delay: 0.08,
          });
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      enterListeners.push({ card, onEnter });
      leaveListeners.push({ card, onLeave });
    });

    return () => {
      enterListeners.forEach(({ card, onEnter }) => card.removeEventListener("mouseenter", onEnter));
      leaveListeners.forEach(({ card, onLeave }) => card.removeEventListener("mouseleave", onLeave));
      gsap.set(cards, { clearProps: "all" });
    };
  });

  // Mobile & Tablet (screens <= 1024px)
  mm.add("(max-width: 1024px)", () => {
    const cardsWrapper = document.querySelector(".cards-wrapper");
    if (!cardsWrapper) return;

    const scrollPerCard = Math.min(window.innerHeight * 0.75, 450);
    const navH = 50;
    const mobileRotations = [-4, 3, -5, 4, -2];

    cards.forEach((card, i) => {
      gsap.set(card, {
        position: "absolute",
        left: "50%",
        top: 0,
        xPercent: -50,
        y: i === 0 ? 0 : window.innerHeight * 1.05,
        rotation: mobileRotations[i % mobileRotations.length],
        zIndex: i + 1,
        transformOrigin: "center center",
      });
    });

    const wrapperH =
      window.innerHeight * 0.65 + scrollPerCard * (cards.length - 1);
    gsap.set(cardsWrapper, { height: wrapperH });

    const pinTrigger = ScrollTrigger.create({
      trigger: cardsWrapper,
      start: `top ${navH}px`,
      end: `+=${scrollPerCard * (cards.length - 1)}`,
      pin: true,
      pinSpacing: true,
      id: "mobile-cards-pin",
    });

    const cardTweens = [];
    cards.forEach((card, i) => {
      if (i === 0) return;
      const tw = gsap.fromTo(
        card,
        { y: window.innerHeight * 1.05 },
        {
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsWrapper,
            start: `top+=${(i - 1) * scrollPerCard} ${navH}px`,
            end: `top+=${i * scrollPerCard} ${navH}px`,
            scrub: 0.3,
          },
        },
      );
      cardTweens.push(tw);
    });

    return () => {
      pinTrigger.kill();
      cardTweens.forEach(t => t.kill());
      gsap.set(cards, { clearProps: "all" });
      gsap.set(cardsWrapper, { clearProps: "all" });
    };
  });

  return () => mm.revert();
}
