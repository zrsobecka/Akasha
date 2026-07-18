import { useEffect, useRef } from "react";

type AkashaAtmosphereProps = {
  activeView: string;
};

export default function AkashaAtmosphere({
  activeView,
}: AkashaAtmosphereProps) {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let animationFrame: number | null = null;

    const updateFieldPosition = (event: PointerEvent) => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const field = fieldRef.current;
        if (!field) return;

        const horizontal = event.clientX / window.innerWidth - 0.5;
        const vertical = event.clientY / window.innerHeight - 0.5;
        field.style.setProperty("--field-drift-x", `${horizontal * 18}px`);
        field.style.setProperty("--field-drift-y", `${vertical * 12}px`);
        field.style.setProperty("--light-x", `${event.clientX}px`);
        field.style.setProperty("--light-y", `${event.clientY}px`);
        animationFrame = null;
      });
    };

    window.addEventListener("pointermove", updateFieldPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", updateFieldPosition);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className="akasha-atmosphere"
      data-active-view={activeView}
      aria-hidden="true"
    >
      <div className="akasha-current akasha-current-one" />
      <div className="akasha-current akasha-current-two" />
      <div className="akasha-pointer-light" />

      <svg
        className="akasha-dependency-field"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="akasha-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.45" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="akasha-node">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="0.26" stopColor="currentColor" stopOpacity="0.36" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <filter
            id="akasha-soft-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <g className="akasha-grid-lines">
          <path d="M-80 116 C190 48 360 208 594 144 S1040 62 1480 190" />
          <path d="M-70 334 C210 250 392 414 674 338 S1110 246 1470 392" />
          <path d="M-90 584 C230 478 430 660 742 562 S1130 486 1480 632" />
          <path d="M92 -40 C56 230 234 338 178 570 S160 780 286 960" />
          <path d="M468 -60 C376 186 558 314 488 530 S494 766 618 960" />
          <path d="M916 -60 C802 176 1014 318 916 522 S934 768 1070 960" />
          <path d="M1280 -50 C1178 186 1368 316 1262 548 S1290 776 1418 930" />
        </g>

        <g className="akasha-strong-links">
          <path d="M178 570 C364 472 450 522 604 426 S850 336 1038 392" />
          <path d="M594 144 C674 260 620 334 742 418 S930 494 916 622" />
          <path d="M488 530 C638 646 806 616 916 522 S1104 394 1262 548" />
        </g>

        <g className="akasha-flow-lines">
          <path
            pathLength="1"
            d="M-80 116 C190 48 360 208 594 144 S1040 62 1480 190"
          />
          <path
            pathLength="1"
            d="M-70 334 C210 250 392 414 674 338 S1110 246 1470 392"
          />
          <path
            pathLength="1"
            d="M178 570 C364 472 450 522 604 426 S850 336 1038 392"
          />
          <path
            pathLength="1"
            d="M488 530 C638 646 806 616 916 522 S1104 394 1262 548"
          />
        </g>

        <g className="akasha-nodes">
          <circle cx="178" cy="570" r="4" />
          <circle cx="488" cy="530" r="5" />
          <circle cx="594" cy="144" r="4" />
          <circle cx="674" cy="338" r="6" />
          <circle cx="742" cy="562" r="4" />
          <circle cx="916" cy="522" r="7" />
          <circle cx="1038" cy="392" r="4" />
          <circle cx="1262" cy="548" r="5" />
        </g>

        <g className="akasha-inference-node" transform="translate(916 522)">
          <circle className="inference-halo" r="62" />
          <circle className="inference-orbit" r="34" />
          <circle className="inference-core-glow" r="18" />
          <circle className="inference-core" r="4" />
        </g>
      </svg>

      <div className="akasha-depth-vignette" />
    </div>
  );
}
