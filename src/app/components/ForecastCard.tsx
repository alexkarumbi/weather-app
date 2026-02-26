import WeatherIcon from "./WeatherIcon";

type Props = {
  date: string;
  temp: number;
  icon: string;
  unit: "metric" | "imperial";
  index?: number;
};

export default function ForecastCard({ date, temp, icon, unit, index = 0 }: Props) {
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const delayClass = `animate-fade-in-delay-${Math.min(index + 1, 3)}`;

  return (
    <div className={`glass rounded-2xl p-5 flex flex-col items-center gap-2 hover-lift transition-smooth ${delayClass}`}>
      <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">{date}</p>
      <WeatherIcon code={icon} size={48} />
      <p className="text-xl font-semibold text-white">
        {temp}
        <span className="text-sm font-normal text-white/50 ml-0.5">{unitSymbol}</span>
      </p>
    </div>
  );
}
  