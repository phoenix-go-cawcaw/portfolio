import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const useGsapAnimation = () => {
  const elementRef = useRef<HTMLElement>(null);

  const fadeInUp = (duration = 1, delay = 0) => {
    if (!elementRef.current) return;
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
    );
  };

  const fadeInDown = (duration = 1, delay = 0) => {
    if (!elementRef.current) return;
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
    );
  };

  const fadeIn = (duration = 1, delay = 0) => {
    if (!elementRef.current) return;
    gsap.fromTo(
      elementRef.current,
      { opacity: 0 },
      { opacity: 1, duration, delay, ease: 'power2.out' }
    );
  };

  const scaleIn = (duration = 0.8, delay = 0) => {
    if (!elementRef.current) return;
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
    );
  };

  const slideInLeft = (duration = 1, delay = 0) => {
    if (!elementRef.current) return;
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
    );
  };

  const slideInRight = (duration = 1, delay = 0) => {
    if (!elementRef.current) return;
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
    );
  };

  return {
    elementRef,
    fadeInUp,
    fadeInDown,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
  };
};

export const useScrollTriggerAnimation = (callback?: () => void) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    ScrollTrigger.create({
      trigger: elementRef.current,
      onEnter: () => callback?.(),
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [callback]);

  return elementRef;
};
