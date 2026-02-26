import React from "react";

type StatItem = {
  label: string;
  value: string;
  icon: React.ReactElement;
};

type Props = {
  wind: number;
  humidity: number;
  unit?: "metric" | "imperial";
};

export default function WeatherStats({ wind, humidity, unit = "metric" }: Props) {
  const windUnit = unit === "imperial" ? "mph" : "km/h";

  const stats: StatItem[] = [
    {
      label: "Wind Speed",
      value: `${wind} ${windUnit}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8.5a2.5 2.5 0 1 0 0-5H14M6 16h5.5a2.5 2.5 0 1 1 0 5H10M6 8h3.5a2.5 2.5 0 0 0 0-5H9" />
        </svg>
      ),
    },
    {
      label: "Humidity",
      value: `${humidity}%`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.172l-5.364 5.364a7.585 7.585 0 1 0 10.728 0L12 3.172z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm animate-fade-in-delay-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-2xl p-5 flex flex-col gap-3 hover-lift transition-smooth"
        >
          <div className="flex items-center gap-2 text-blue-300/70">
            {stat.icon}
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {stat.label}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
  