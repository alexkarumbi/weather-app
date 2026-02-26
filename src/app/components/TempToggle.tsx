"use client";

type Props = {
  unit: "metric" | "imperial";
  onToggle: (unit: "metric" | "imperial") => void;
};

export default function TempToggle({ unit, onToggle }: Props) {
  return (
    <div className="inline-flex items-center glass rounded-xl p-1 gap-0.5">
      <button
        onClick={() => onToggle("metric")}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-smooth ${
          unit === "metric"
            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle("imperial")}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-smooth ${
          unit === "imperial"
            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        °F
      </button>
    </div>
  );
}
