export function HeroIllustration() {
  return (
    <svg
      className="mx-auto w-full max-w-[440px]"
      viewBox="0 0 400 380"
      role="img"
      aria-label="Growing bar chart with a launching rocket"
    >
      <rect className="hero-bar hero-bar-1" x="96" y="200" width="62" height="112" rx="4" fill="#0c77bb" />
      <rect className="hero-bar hero-bar-2" x="176" y="140" width="62" height="172" rx="4" fill="#f8701a" />
      <rect className="hero-bar hero-bar-3" x="256" y="70" width="62" height="242" rx="4" fill="#0c77bb" />
      <path
        className="hero-arrow"
        d="M34 262 C110 360 250 360 352 170"
        fill="none"
        stroke="#1a3c8e"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <polygon className="hero-arrow-head" points="372,118 388,196 328,170" fill="#1a3c8e" />
      <g className="hero-rocket">
        <g className="hero-rocket-inner" transform="translate(150 70) rotate(40)">
          <polygon className="hero-flame" points="-9,26 9,26 0,66" fill="#f8701a" />
          <path d="M0 -44 C22 -26 22 6 14 28 L-14 28 C-22 6 -22 -26 0 -44Z" fill="#1ea5e8" />
          <circle cx="0" cy="-12" r="7" fill="#ffffff" />
          <polygon points="-14,10 -26,32 -14,28" fill="#f8701a" />
          <polygon points="14,10 26,32 14,28" fill="#f8701a" />
        </g>
      </g>
    </svg>
  );
}
