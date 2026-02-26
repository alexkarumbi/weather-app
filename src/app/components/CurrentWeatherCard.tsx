import WeatherIcon from "./WeatherIcon";

type Props = {
  temp: number;
  description: string;
  icon: string;
  unit: "metric" | "imperial";
  city?: string;
  isPinned?: boolean;
  onTogglePin?: () => void;
};

export default function CurrentWeatherCard({ temp, description, icon, unit, city, isPinned, onTogglePin }: Props) {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="glass-strong rounded-3xl p-8 w-full max-w-sm text-center animate-fade-in hover-lift transition-smooth relative">
      {/* Pin / Favorite button */}
      {onTogglePin && (
        <button
          onClick={onTogglePin}
          className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-smooth ${
            isPinned
              ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
              : "bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/10"
          }`}
          title={isPinned ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className="w-5 h-5"
            fill={isPinned ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      )}

      <div className="flex justify-center mb-2">
        <WeatherIcon code={icon} size={96} />
      </div>

      <div className="mt-2">
        <span className="text-7xl font-extralight text-white tracking-tight">
          {temp}
        </span>
        <span className="text-2xl font-light text-white/60 ml-1">{unitSymbol}</span>
      </div>

      <p className="text-lg text-white/70 capitalize mt-2 font-medium">{description}</p>

      {city && (
        <div className="flex items-center justify-center gap-1.5 mt-3 text-white/50 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{city}</span>
        </div>
      )}
    </div>
  );
}
  