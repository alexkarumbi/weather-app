import React from "react";

type Props = {
  code: string;
  size?: number;
  className?: string;
};

/**
 * SVG weather icons mapped to OpenWeatherMap-style icon codes.
 * Renders inline SVGs so no external image dependencies.
 */
export default function WeatherIcon({ code, size = 64, className = "" }: Props) {
  const s = size;

  const icons: Record<string, React.ReactElement> = {
    // Clear sky
    "01d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <circle cx="32" cy="32" r="14" fill="#FBBF24" />
        <circle cx="32" cy="32" r="14" fill="url(#sunGrad)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="32"
            y1={32 - 20}
            x2="32"
            y2={32 - 24}
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 32 32)`}
          />
        ))}
        <defs>
          <radialGradient id="sunGrad" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>
      </svg>
    ),

    // Few clouds
    "02d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <circle cx="42" cy="20" r="10" fill="#FBBF24" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line
            key={i}
            x1="42"
            y1={20 - 14}
            x2="42"
            y2={20 - 17}
            stroke="#FBBF24"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${angle} 42 20)`}
          />
        ))}
        <path
          d="M16 42a10 10 0 0 1 10-10h2a8 8 0 0 1 15.5 2A8 8 0 0 1 44 42z"
          fill="white"
          fillOpacity="0.9"
        />
        <path
          d="M16 42a10 10 0 0 1 10-10h2a8 8 0 0 1 15.5 2A8 8 0 0 1 44 42z"
          fill="url(#cloudGrad2)"
        />
        <defs>
          <linearGradient id="cloudGrad2" x1="16" y1="30" x2="44" y2="44">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
    ),

    // Scattered / broken clouds
    "03d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <path
          d="M12 40a12 12 0 0 1 12-12h3a10 10 0 0 1 19.2 2.5A10 10 0 0 1 48 40z"
          fill="white"
          fillOpacity="0.85"
        />
        <path
          d="M12 40a12 12 0 0 1 12-12h3a10 10 0 0 1 19.2 2.5A10 10 0 0 1 48 40z"
          fill="url(#cloudGrad3)"
        />
        <defs>
          <linearGradient id="cloudGrad3" x1="12" y1="26" x2="48" y2="42">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    ),

    // Overcast
    "04d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <path
          d="M10 44a14 14 0 0 1 14-14h2a11 11 0 0 1 21 3A11 11 0 0 1 50 44z"
          fill="#94A3B8"
          fillOpacity="0.8"
        />
        <path
          d="M18 38a8 8 0 0 1 8-8h1a7 7 0 0 1 13.5 2A7 7 0 0 1 42 38z"
          fill="#CBD5E1"
          fillOpacity="0.6"
        />
      </svg>
    ),

    // Rain showers
    "09d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <path
          d="M12 34a12 12 0 0 1 12-12h3a10 10 0 0 1 19.2 2.5A10 10 0 0 1 48 34z"
          fill="#94A3B8"
          fillOpacity="0.8"
        />
        {[22, 30, 38].map((x, i) => (
          <line key={i} x1={x} y1="40" x2={x - 2} y2="50" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        ))}
      </svg>
    ),

    // Rain
    "10d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <path
          d="M12 32a12 12 0 0 1 12-12h3a10 10 0 0 1 19.2 2.5A10 10 0 0 1 48 32z"
          fill="#64748B"
          fillOpacity="0.85"
        />
        {[20, 28, 36, 44].map((x, i) => (
          <line key={i} x1={x} y1="38" x2={x - 3} y2="52" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        ))}
      </svg>
    ),

    // Thunderstorm
    "11d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <path
          d="M12 30a12 12 0 0 1 12-12h3a10 10 0 0 1 19.2 2.5A10 10 0 0 1 48 30z"
          fill="#475569"
          fillOpacity="0.9"
        />
        <polygon points="30,34 26,44 32,44 28,56 38,42 32,42 36,34" fill="#FBBF24" />
        {[20, 42].map((x, i) => (
          <line key={i} x1={x} y1="36" x2={x - 2} y2="48" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        ))}
      </svg>
    ),

    // Snow
    "13d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        <path
          d="M12 32a12 12 0 0 1 12-12h3a10 10 0 0 1 19.2 2.5A10 10 0 0 1 48 32z"
          fill="#94A3B8"
          fillOpacity="0.7"
        />
        {[22, 32, 42].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={42 + i * 3} r="2" fill="white" fillOpacity="0.9" />
            <circle cx={x - 5} cy={48 + i * 2} r="1.5" fill="white" fillOpacity="0.7" />
          </g>
        ))}
      </svg>
    ),

    // Mist / Fog
    "50d": (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
        {[24, 30, 36, 42].map((y, i) => (
          <line
            key={i}
            x1={12 + i * 2}
            y1={y}
            x2={52 - i * 2}
            y2={y}
            stroke="#94A3B8"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.4 + i * 0.15}
          />
        ))}
      </svg>
    ),
  };

  // Fallback: use the "d" (day) variant for any code
  const normalizedCode = code.replace("n", "d");
  const icon = icons[code] || icons[normalizedCode] || icons["01d"];

  return <div className="flex items-center justify-center">{icon}</div>;
}
