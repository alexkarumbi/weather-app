type Props = {
    wind: number;
    humidity: number;
  };
  
  export default function WeatherStats({ wind, humidity }: Props) {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="card bg-base-100 shadow p-4">
          <p className="text-sm text-gray-500">Wind</p>
          <p className="text-xl font-bold">{wind} km/h</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-xl font-bold">{humidity}%</p>
        </div>
      </div>
    );
  }
  