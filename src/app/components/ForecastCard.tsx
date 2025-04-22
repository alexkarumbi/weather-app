type Props = {
    date: string;
    temp: number;
    icon: string;
    unit: "metric" | "imperial";
  };
  
  export default function ForecastCard({ date, temp, icon, unit }: Props) {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const unitSymbol = unit === "metric" ? "°C" : "°F";
  
    return (
      <div className="card w-40 bg-base-100 shadow p-3 flex flex-col items-center">
        <p className="font-medium">{date}</p>
        <img src={iconUrl} alt="icon" className="w-12 h-12" />
        <p className="text-lg font-semibold">
          {temp}{unitSymbol}
        </p>
      </div>
    );
  }
  