"use client";

import WeatherIcon from "./WeatherIcon";

export type PinnedWeatherData = {
  city: string;
  country: string;
  temp: number;
  description: string;
  icon: string;
  wind: number;
  humidity: number;
};

type Props = {
  data: PinnedWeatherData;
  unit: "metric" | "imperial";
  onUnpin: () => void;
  onClick: () => void;
  loading?: boolean;
};

export default function PinnedCityCard({ data, unit, onUnpin, onClick, loading }: Props) {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  if (loading) {
    return (
      <div className="glass rounded-2xl p-4 flex items-center gap-4 skeleton-pulse min-h-[80px]">
        <div className="w-12 h-12 rounded-xl bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-white/10 rounded" />
          <div className="h-3 w-16 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-4 hover-lift transition-smooth group cursor-pointer relative">
      {/* Main clickable area */}
      <div className="flex items-center gap-4 flex-1 min-w-0" onClick={onClick}>
        <div className="shrink-0">
          <WeatherIcon code={data.icon} size={48} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm truncate">
              {data.city}
            </p>
            {data.country && (
              <span className="text-white/30 text-xs shrink-0">{data.country}</span>
            )}
          </div>
          <p className="text-white/40 text-xs capitalize truncate">{data.description}</p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-2xl font-semibold text-white">
            {data.temp}
            <span className="text-sm font-normal text-white/40 ml-0.5">{unitSymbol}</span>
          </p>
        </div>
      </div>

      {/* Unpin button — shows on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onUnpin();
        }}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth shadow-lg"
        title="Remove from favorites"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
