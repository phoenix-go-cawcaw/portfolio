import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export const animateTextOnScroll = (element: HTMLElement, duration = 1.5) => {
  const text = element.innerText;
  let charIndex = 0;

  gsap.to(element, {
    duration,
    ease: 'none',
    onUpdate: () => {
      const progress = gsap.getProperty(element, 'progress') as number || 0;
      charIndex = Math.floor(progress * text.length);
      element.innerText = text.substring(0, charIndex);
    },
  });
};

export const createStaggerAnimation = (
  elements: HTMLElement[],
  duration = 0.6,
  stagger = 0.1,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
) => {
  const animationProps: Record<string, any> = {
    opacity: 1,
    duration,
    ease: 'power3.out',
    stagger,
  };

  const fromProps: Record<string, any> = { opacity: 0 };

  switch (direction) {
    case 'up':
      fromProps.y = 40;
      animationProps.y = 0;
      break;
    case 'down':
      fromProps.y = -40;
      animationProps.y = 0;
      break;
    case 'left':
      fromProps.x = -60;
      animationProps.x = 0;
      break;
    case 'right':
      fromProps.x = 60;
      animationProps.x = 0;
      break;
  }

  return gsap.fromTo(elements, fromProps, animationProps);
};

export const createPulseAnimation = (element: HTMLElement, scale = 1.05, duration = 0.5) => {
  return gsap.to(element, {
    scale,
    duration,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
  });
};

export const createHoverGlow = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      filter: 'drop-shadow(0 0 20px rgba(192, 57, 43, 0.6))',
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      filter: 'drop-shadow(2px 3px 8px rgba(139, 26, 26, 0.35))',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

export const createBrushStroke = (
  element: SVGPathElement,
  duration = 2,
  onComplete?: () => void
) => {
  const length = element.getTotalLength();

  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(element, {
    strokeDashoffset: 0,
    duration,
    ease: 'power2.inOut',
    onComplete,
  });
};

export const createFloatingAnimation = (element: HTMLElement, distance = 20, duration = 3) => {
  return gsap.to(element, {
    y: distance,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
};

export const createRotateAnimation = (element: HTMLElement, degrees = 360, duration = 8) => {
  return gsap.to(element, {
    rotation: degrees,
    duration,
    ease: 'none',
    repeat: -1,
  });
};
