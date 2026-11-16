interface KMarkProps {
  className?: string;
  variant?: "full" | "compact";
  animated?: boolean;
  title?: string;
}

const K_PATHS = (
  <g fill="#E8E6E1">
    <path d="M302 300H402V700H302Z" />
    <path d="M418 470L588 300H698L418 580Z" />
    <path d="M455 567L588 700H698L510 512Z" />
  </g>
);

export function KMark({
  className,
  variant = "full",
  animated = false,
  title,
}: KMarkProps) {
  const compact = variant === "compact";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={compact ? "230 190 560 560" : "0 0 1000 1000"}
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      className={className}
    >
      {title ? <title>{title}</title> : null}

      <rect width="1000" height="1000" fill="#0A0A0B" />

      {compact ? (
        <>
          {K_PATHS}
          <rect
            x="698"
            y="240"
            width="60"
            height="60"
            fill="#FF4D1A"
            className={animated ? "kmark-signal" : undefined}
          />
        </>
      ) : (
        <>
          <g stroke="#1F1F24" strokeWidth="2" strokeDasharray="6 10">
            <path d="M100 300H900M100 700H900M500 100V900" />
          </g>

          <g stroke="#3A3A41" strokeWidth="3" strokeLinecap="butt">
            <path d="M136 100H900V864" />
            <path d="M864 900H100V136" />
          </g>

          <g strokeWidth="3">
            <path d="M148 900V884" stroke="#3A3A41" />
            <path d="M192 900V892" stroke="#3A3A41" />
            <path d="M236 900V892" stroke="#3A3A41" />
            <path d="M280 900V892" stroke="#3A3A41" />
            <path d="M324 900V884" stroke="#3A3A41" />
            <path d="M368 900V892" stroke="#3A3A41" />
            <path d="M412 900V892" stroke="#3A3A41" />
            <path d="M456 900V892" stroke="#3A3A41" />
            <path d="M500 900V874" stroke="#FF4D1A" />
            <path d="M544 900V892" stroke="#3A3A41" />
            <path d="M588 900V892" stroke="#3A3A41" />
            <path d="M632 900V892" stroke="#3A3A41" />
            <path d="M676 900V884" stroke="#3A3A41" />
            <path d="M720 900V892" stroke="#3A3A41" />
            <path d="M764 900V892" stroke="#3A3A41" />
            <path d="M808 900V892" stroke="#3A3A41" />
            <path d="M852 900V884" stroke="#3A3A41" />
            <path d="M100 148H116" stroke="#3A3A41" />
            <path d="M100 192H108" stroke="#3A3A41" />
            <path d="M100 236H108" stroke="#3A3A41" />
            <path d="M100 280H108" stroke="#3A3A41" />
            <path d="M100 324H116" stroke="#3A3A41" />
            <path d="M100 368H108" stroke="#3A3A41" />
            <path d="M100 412H108" stroke="#3A3A41" />
            <path d="M100 456H108" stroke="#3A3A41" />
            <path d="M100 500H126" stroke="#FF4D1A" />
            <path d="M100 544H108" stroke="#3A3A41" />
            <path d="M100 588H108" stroke="#3A3A41" />
            <path d="M100 632H108" stroke="#3A3A41" />
            <path d="M100 676H116" stroke="#3A3A41" />
            <path d="M100 720H108" stroke="#3A3A41" />
            <path d="M100 764H108" stroke="#3A3A41" />
            <path d="M100 808H108" stroke="#3A3A41" />
            <path d="M100 852H116" stroke="#3A3A41" />
          </g>

          <g stroke="#E8E6E1" strokeWidth="3">
            <path d="M70 100H130M100 70V130" />
            <path d="M870 900H930M900 870V930" />
          </g>

          <g stroke="#3A3A41" strokeWidth="2">
            <path d="M792 300H808M792 700H808M800 300V700" />
            <path d="M302 752V768M698 752V768M302 760H698" />
          </g>

          <g
            stroke="#3A3A41"
            strokeWidth="2"
            strokeDasharray="4 6"
            transform="translate(16 16)"
          >
            <path d="M302 300H402V700H302Z" />
            <path d="M418 470L588 300H698L418 580Z" />
            <path d="M455 567L588 700H698L510 512Z" />
          </g>

          {K_PATHS}

          <rect
            x="698"
            y="240"
            width="60"
            height="60"
            fill="#FF4D1A"
            className={animated ? "kmark-signal" : undefined}
          />

          <text
            x="140"
            y="872"
            fill="#7A7A80"
            fontFamily="'JetBrains Mono','Geist Mono','SFMono-Regular',Consolas,monospace"
            fontSize="18"
            letterSpacing="2"
          >
            ~/konain
          </text>
        </>
      )}
    </svg>
  );
}
