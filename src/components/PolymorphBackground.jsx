import '../styles/polymorph.css';

const PolymorphBackground = () => {
  return (
    <div className="polymorph-background" aria-hidden="true">
      <svg
        className="polymorph-svg"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--color-accent-secondary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent-tertiary)" stopOpacity="0.3" />
          </linearGradient>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>

        <g filter="url(#goo)">
          <circle className="blob blob-1" cx="200" cy="200" r="150" fill="url(#gradient1)" />
          <circle className="blob blob-2" cx="800" cy="300" r="180" fill="url(#gradient1)" />
          <circle className="blob blob-3" cx="400" cy="700" r="160" fill="url(#gradient1)" />
          <circle className="blob blob-4" cx="700" cy="800" r="140" fill="url(#gradient1)" />
        </g>
      </svg>
    </div>
  );
};

export default PolymorphBackground;
