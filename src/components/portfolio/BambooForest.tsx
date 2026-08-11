const BambooForest = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[76%]" aria-hidden="true">
    <svg viewBox="0 0 900 520" className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.72" stroke="hsl(var(--ink) / 0.22)" strokeWidth="3" fill="none">
        <path className="bamboo-stalk" d="M120 500C132 430 130 355 142 275" />
        <path className="bamboo-stalk" d="M220 500C232 430 230 360 242 290" />
        <path className="bamboo-stalk" d="M320 500C332 430 330 360 342 290" />
        <path className="bamboo-stalk" d="M420 500C432 430 430 360 442 290" />
        <path className="bamboo-stalk" d="M520 500C532 430 530 360 542 300" />
        <path className="bamboo-stalk" d="M620 500C632 430 630 355 642 280" />
      </g>
      <g opacity="0.55" stroke="hsl(var(--seal) / 0.35)" strokeWidth="2.2" fill="none">
        <path className="bamboo-leaf" d="M128 340C160 320 176 296 190 272" />
        <path className="bamboo-leaf" d="M232 340C264 320 280 296 294 270" />
        <path className="bamboo-leaf" d="M332 340C364 320 380 296 394 270" />
        <path className="bamboo-leaf" d="M432 340C464 320 480 296 494 270" />
        <path className="bamboo-leaf" d="M536 338C566 318 582 294 596 268" />
        <path className="bamboo-leaf" d="M640 332C672 312 688 288 702 262" />
      </g>
      <g className="dragonfly-flight" opacity="0.9">
        <ellipse cx="680" cy="175" rx="18" ry="10" fill="hsl(var(--seal) / 0.3)" />
        <circle cx="686" cy="175" r="3.5" fill="hsl(var(--ink))" />
        <path d="M665 170L650 160" stroke="hsl(var(--ink) / 0.7)" strokeWidth="2" strokeLinecap="round" />
        <path d="M702 171L718 162" stroke="hsl(var(--ink) / 0.7)" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

export default BambooForest;
