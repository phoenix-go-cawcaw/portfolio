import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ParallaxBackground = () => {
  const lanternsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lanterns = lanternsRef.current;
    const heroSection = document.getElementById('hero');

    if (lanterns && heroSection) {
      const tween = gsap.to(lanterns, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'bottom top',
          end: 'bottom center',
          scrub: true,
        },
      });

      return () => tween.kill();
    }

    return undefined;
  }, []);

  useEffect(() => {
    // Falling leaves
    const leavesLayer = document.getElementById('leaves-layer');
    if (!leavesLayer) return;

    const leafPaths = [
      `<svg viewBox="0 0 24 28" width="18" height="21"><path d="M12,2 Q18,6 20,12 Q22,18 16,22 Q12,24 12,24 Q12,24 8,22 Q2,18 4,12 Q6,6 12,2Z" fill="currentColor"/><line x1="12" y1="2" x2="12" y2="28" stroke="currentColor" stroke-width="0.8" opacity="0.5"/></svg>`,
      `<svg viewBox="0 0 28 28" width="16" height="16"><path d="M14,0 L16,8 L20,6 L17,12 L22,11 L18,16 L22,20 L17,19 L18,24 L14,22 L10,24 L11,19 L6,20 L10,16 L6,11 L11,12 L8,6 L12,8 Z" fill="currentColor"/></svg>`,
      `<svg viewBox="0 0 20 24" width="14" height="18"><path d="M10,1 Q17,3 18,10 Q19,17 12,22 Q10,23 10,23 Q10,23 8,22 Q1,17 2,10 Q3,3 10,1Z" fill="currentColor"/><line x1="10" y1="1" x2="10" y2="23" stroke="currentColor" stroke-width="0.7" opacity="0.6"/></svg>`,
    ];

    const leafColors = [
      'rgba(140,80,30,0.55)', 'rgba(180,100,20,0.5)', 'rgba(200,140,40,0.5)',
      'rgba(100,140,60,0.45)', 'rgba(160,60,30,0.55)', 'rgba(120,90,40,0.5)'
    ];

    const createLeaf = () => {
      const el = document.createElement('div');
      el.className = 'leaf';
      el.style.left = (5 + Math.random() * 90) + '%';
      el.style.top = '-60px';
      el.style.color = leafColors[Math.floor(Math.random() * leafColors.length)];
      el.style.animationDuration = (8 + Math.random() * 12) + 's';
      el.style.animationDelay = (Math.random() * 8) + 's';
      el.innerHTML = leafPaths[Math.floor(Math.random() * leafPaths.length)];
      leavesLayer.appendChild(el);
      setTimeout(() => el.remove(), 22000);
    };

    const leafInterval = setInterval(createLeaf, 1800);
    for (let i = 0; i < 6; i++) setTimeout(createLeaf, i * 400);

    // Flying birds
    const birdsLayer = document.getElementById('birds-layer');
    if (birdsLayer) {
      const createFlock = () => {
        const el = document.createElement('div');
        el.className = 'bird-flock';
        el.style.top = (8 + Math.random() * 35) + '%';
        el.style.animationDuration = (18 + Math.random() * 14) + 's';
        el.style.animationDelay = (Math.random() * 10) + 's';
        const birdCount = 3 + Math.floor(Math.random() * 4);
        let svgContent = `<svg viewBox="0 0 ${birdCount * 22} 20" width="${birdCount * 22}" height="20" fill="none">`;
        for (let b = 0; b < birdCount; b++) {
          const bx = b * 22 + 5 + (Math.random() - 0.5) * 8;
          const by = 8 + (Math.random() - 0.5) * 6;
          svgContent += `<path d="M${bx},${by} Q${bx+5},${by-4} ${bx+10},${by} Q${bx+5},${by+1} ${bx},${by}Z" fill="rgba(26,15,10,0.8)"/>`;
        }
        svgContent += '</svg>';
        el.innerHTML = svgContent;
        birdsLayer.appendChild(el);
        setTimeout(() => el.remove(), 35000);
      };

      const birdInterval = setInterval(createFlock, 6000);
      createFlock();

      return () => {
        clearInterval(leafInterval);
        clearInterval(birdInterval);
      };
    }

    return () => clearInterval(leafInterval);
  }, []);

  return (
    <div id="bg-canvas" className="fixed inset-0 z-0">
      {/* ── PARALLAX BG STAGES ── */}
      <div className="bg-stage active" id="stage-0">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0 }}>
          <defs><filter id="s0b1"><feGaussianBlur stdDeviation="3"/></filter><filter id="s0b2"><feGaussianBlur stdDeviation="8"/></filter><filter id="s0b3"><feGaussianBlur stdDeviation="20"/></filter></defs>
          <rect width="100%" height="100%" fill="#f0e8dc"/>
          <ellipse cx="50%" cy="92%" rx="70%" ry="18%" fill="rgba(200,210,190,0.25)" filter="url(#s0b3)"/>
          <path d="M0,78 L8,55 L15,65 L22,42 L30,58 L38,38 L45,52 L52,35 L60,50 L67,40 L74,52 L82,44 L90,55 L100,60 L100,100 L0,100 Z" fill="rgba(150,160,148,0.16)" filter="url(#s0b3)"/>
          <path d="M0,85 L12,68 L20,76 L28,60 L36,72 L44,62 L52,74 L60,65 L68,75 L76,68 L84,76 L92,70 L100,72 L100,100 L0,100 Z" fill="rgba(100,120,105,0.2)" filter="url(#s0b2)"/>
          <path d="M0,92 L10,82 L20,88 L30,78 L40,86 L50,80 L60,88 L70,82 L80,88 L90,83 L100,86 L100,100 L0,100 Z" fill="rgba(60,80,58,0.26)" filter="url(#s0b1)"/>
          <rect y="60%" width="100%" height="20%" fill="rgba(245,242,235,0.42)" filter="url(#s0b3)"/>
          <rect y="75%" width="100%" height="15%" fill="rgba(240,238,230,0.32)" filter="url(#s0b3)"/>
        </svg>
      </div>

      {/* Stage 1: Bamboo forest */}
      <div className="bg-stage" id="stage-1">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0 }}>
          <defs><filter id="s1b1"><feGaussianBlur stdDeviation="4"/></filter><filter id="s1b2"><feGaussianBlur stdDeviation="12"/></filter><filter id="s1b3"><feGaussianBlur stdDeviation="25"/></filter></defs>
          <rect width="100%" height="100%" fill="#e8ede4"/>
          <ellipse cx="50%" cy="50%" rx="60%" ry="40%" fill="rgba(160,185,155,0.2)" filter="url(#s1b3)"/>
          <line x1="15%" y1="0" x2="14%" y2="100%" stroke="rgba(60,100,55,0.1)" strokeWidth="25" filter="url(#s1b2)"/>
          <line x1="28%" y1="0" x2="27%" y2="100%" stroke="rgba(60,100,55,0.08)" strokeWidth="18" filter="url(#s1b2)"/>
          <line x1="52%" y1="0" x2="53%" y2="100%" stroke="rgba(60,100,55,0.07)" strokeWidth="30" filter="url(#s1b2)"/>
          <line x1="72%" y1="0" x2="71%" y2="100%" stroke="rgba(60,100,55,0.09)" strokeWidth="20" filter="url(#s1b2)"/>
          <line x1="88%" y1="0" x2="87%" y2="100%" stroke="rgba(60,100,55,0.06)" strokeWidth="15" filter="url(#s1b2)"/>
          <path d="M0,88 Q25,82 50,88 Q75,94 100,88 L100,100 L0,100 Z" fill="rgba(58,125,110,0.1)" filter="url(#s1b2)"/>
          <rect y="90%" width="100%" height="10%" fill="rgba(40,90,55,0.18)" filter="url(#s1b1)"/>
          <rect y="0" width="100%" height="20%" fill="rgba(235,240,232,0.5)" filter="url(#s1b3)"/>
        </svg>
      </div>

      {/* Stage 2: Mountain peaks */}
      <div className="bg-stage" id="stage-2">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0 }}>
          <defs><filter id="s2b1"><feGaussianBlur stdDeviation="2"/></filter><filter id="s2b2"><feGaussianBlur stdDeviation="8"/></filter><filter id="s2b3"><feGaussianBlur stdDeviation="22"/></filter></defs>
          <rect width="100%" height="100%" fill="#eae8e2"/>
          <ellipse cx="50%" cy="25%" rx="40%" ry="30%" fill="rgba(235,215,175,0.18)" filter="url(#s2b3)"/>
          <path d="M0,75 L5,55 L12,68 L20,45 L28,60 L35,40 L42,55 L50,30 L58,48 L65,35 L72,52 L80,38 L87,55 L95,42 L100,50 L100,100 L0,100 Z" fill="rgba(140,135,125,0.11)" filter="url(#s2b3)"/>
          <path d="M-5,82 L5,62 L15,74 L25,55 L35,68 L45,52 L55,65 L65,50 L75,62 L85,55 L95,65 L105,58 L105,100 L-5,100 Z" fill="rgba(100,95,88,0.17)" filter="url(#s2b2)"/>
          <path d="M0,88 L15,78 L22,85 L32,72 L42,80 L52,75 L62,82 L72,76 L82,83 L92,78 L100,80 L100,100 L0,100 Z" fill="rgba(65,62,55,0.22)" filter="url(#s2b1)"/>
          <line x1="67%" y1="35%" x2="65%" y2="72%" stroke="rgba(200,215,225,0.3)" strokeWidth="3" filter="url(#s2b2)"/>
          <rect y="58%" width="100%" height="12%" fill="rgba(245,242,238,0.48)" filter="url(#s2b3)"/>
          <rect y="72%" width="100%" height="8%" fill="rgba(242,240,235,0.32)" filter="url(#s2b3)"/>
        </svg>
      </div>

      {/* Stage 3: River valley */}
      <div className="bg-stage" id="stage-3">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0 }}>
          <defs><filter id="s3b1"><feGaussianBlur stdDeviation="3"/></filter><filter id="s3b2"><feGaussianBlur stdDeviation="10"/></filter><filter id="s3b3"><feGaussianBlur stdDeviation="25"/></filter></defs>
          <rect width="100%" height="100%" fill="#e5eaee"/>
          <ellipse cx="50%" cy="75%" rx="35%" ry="8%" fill="rgba(180,210,225,0.38)" filter="url(#s3b3)"/>
          <path d="M0,80 Q20,70 40,78 Q60,86 80,74 Q90,68 100,76 L100,100 L0,100 Z" fill="rgba(100,130,115,0.14)" filter="url(#s3b3)"/>
          <path d="M0,86 Q15,76 30,84 Q50,92 70,80 Q85,72 100,82 L100,100 L0,100 Z" fill="rgba(80,110,100,0.2)" filter="url(#s3b2)"/>
          <path d="M0,92 Q30,88 60,91 Q80,94 100,89 L100,100 L0,100 Z" fill="rgba(60,90,80,0.28)" filter="url(#s3b1)"/>
          <ellipse cx="35%" cy="85%" rx="12%" ry="1.5%" fill="rgba(140,180,200,0.2)" filter="url(#s3b2)"/>
          <ellipse cx="65%" cy="88%" rx="10%" ry="1.2%" fill="rgba(140,180,200,0.18)" filter="url(#s3b2)"/>
          <ellipse cx="50%" cy="85%" rx="40%" ry="4%" fill="rgba(140,180,200,0.22)" filter="url(#s3b2)"/>
          <rect y="0" width="100%" height="25%" fill="rgba(230,236,240,0.58)" filter="url(#s3b3)"/>
        </svg>
      </div>

      {/* Stage 4: Dusk red sun */}
      <div className="bg-stage" id="stage-4">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0 }}>
          <defs><filter id="s4b1"><feGaussianBlur stdDeviation="4"/></filter><filter id="s4b2"><feGaussianBlur stdDeviation="15"/></filter><filter id="s4b3"><feGaussianBlur stdDeviation="30"/></filter></defs>
          <rect width="100%" height="100%" fill="#eee5d4"/>
          <circle cx="50%" cy="34%" r="14%" fill="rgba(192,57,43,0.18)" filter="url(#s4b3)"/>
          <circle cx="50%" cy="34%" r="7%" fill="rgba(215,80,50,0.28)" filter="url(#s4b2)"/>
          <rect y="0" width="100%" height="50%" fill="rgba(235,200,140,0.09)" filter="url(#s4b3)"/>
          <path d="M0,80 L10,65 L20,72 L30,58 L40,68 L50,55 L60,65 L70,58 L80,68 L90,62 L100,70 L100,100 L0,100 Z" fill="rgba(60,45,30,0.2)" filter="url(#s4b2)"/>
          <path d="M0,88 L12,78 L25,84 L38,74 L50,80 L62,75 L75,82 L88,76 L100,82 L100,100 L0,100 Z" fill="rgba(45,32,18,0.3)" filter="url(#s4b1)"/>
          <rect y="94%" width="100%" height="6%" fill="rgba(35,25,12,0.35)"/>
          <ellipse cx="50%" cy="96%" rx="30%" ry="3%" fill="rgba(240,195,90,0.1)" filter="url(#s4b2)"/>
        </svg>
      </div>

      {/* Decorations: Lanterns (hero) */}
      <div className="deco-layer" id="deco-lanterns" ref={lanternsRef} style={{ transition: 'opacity 1s ease' }}>
        <div className="lantern lantern-red" style={{ position: 'absolute', top: '5%', left: '5%', animationDelay: '0s' }}>
          <div className="lantern-string"></div>
          <div className="lantern-top"></div>
          <div className="lantern-body"></div>
          <div className="lantern-bottom"></div>
          <div className="lantern-tassel"><span></span><span></span><span></span></div>
        </div>
        <div className="lantern lantern-gold" style={{ position: 'absolute', top: '8%', left: '12%', animationDelay: '0.7s' }}>
          <div className="lantern-string"></div>
          <div className="lantern-top"></div>
          <div className="lantern-body"></div>
          <div className="lantern-bottom"></div>
          <div className="lantern-tassel"><span></span><span></span><span></span></div>
        </div>
        <div className="lantern lantern-red" style={{ position: 'absolute', top: '4%', right: '8%', animationDelay: '1.2s' }}>
          <div className="lantern-string"></div>
          <div className="lantern-top"></div>
          <div className="lantern-body"></div>
          <div className="lantern-bottom"></div>
          <div className="lantern-tassel"><span></span><span></span><span></span></div>
        </div>
        <div className="lantern lantern-gold" style={{ position: 'absolute', top: '10%', right: '16%', animationDelay: '0.4s' }}>
          <div className="lantern-string"></div>
          <div className="lantern-top"></div>
          <div className="lantern-body"></div>
          <div className="lantern-bottom"></div>
          <div className="lantern-tassel"><span></span><span></span><span></span></div>
        </div>
      </div>

      {/* Falling leaves layer */}
      <div id="leaves-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}></div>

      {/* Birds layer */}
      <div className="birds-layer" id="birds-layer"></div>
    </div>
  );
};

export default ParallaxBackground;
