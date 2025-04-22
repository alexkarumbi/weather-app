type Props = {
    temp: number;
    description: string;
    icon: string; // from OpenWeatherMap e.g. "10d"
    unit: "metric" | "imperial";
  };
  
  export default function CurrentWeatherCard({ temp, description, icon, unit }: Props) {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const unitSymbol = unit === "metric" ? "°C" : "°F";
  
    return (
      <div className="card w-80 bg-base-100 shadow-xl p-4">
        <div className="flex flex-col items-center">
          <img src={iconUrl} alt="weather icon" className="w-20 h-20" />
          <h2 className="text-4xl font-bold">{temp}{unitSymbol}</h2>
          <p className="capitalize text-lg text-gray-500">{description}</p>
        </div>
      </div>
    );
  }
  