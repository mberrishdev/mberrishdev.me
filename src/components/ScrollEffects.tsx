"use client";

import { useEffect, useRef } from "react";

/**
 * Owns every piece of client-side behaviour on the page (parallax orbs, scroll
 * reveal, active-nav tracking) so that the page itself can stay a server
 * component and ship no JavaScript for its content.
 */
export default function ScrollEffects() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObs.observe(el));

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".glass-pill a");

    function updateActive() {
      const scrollY = window.scrollY + 100;
      let current = "";
      sections.forEach((s) => {
        if (scrollY >= (s as HTMLElement).offsetTop) current = s.id;
      });
      navLinks.forEach((a) => {
        a.classList.toggle(
          "active",
          current
            ? a.getAttribute("href") === "#" + current
            : a.getAttribute("href") === "#"
        );
      });
    }

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;

    function handleScroll() {
      const y = window.scrollY;
      if (orb1) orb1.style.transform = `translate(${y * 0.03}px, ${y * 0.08}px)`;
      if (orb2) orb2.style.transform = `translate(${-y * 0.04}px, ${-y * 0.06}px)`;
      updateActive();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActive();

    return () => {
      revealObs.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={orb1Ref}
        className="orb"
        style={{ top: "-200px", left: "-150px" }}
        aria-hidden="true"
      />
      <div
        ref={orb2Ref}
        className="orb orb-warm"
        style={{ bottom: "-200px", right: "-150px" }}
        aria-hidden="true"
      />
    </>
  );
}
