"use client";

import { useState } from "react";
import SearchBox from "./components/SearchBox";
import TempToggle from "./components/TempToggle";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import WeatherStats from "./components/WeatherStats";

export default function Home() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null);

  const [location, setLocation] = useState("Nairobi");
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
    icon: string;
    wind: number;
    humidity: number;
    forecast: {
      date: string;
      temp: number;
      icon: string;
    }[];
  } | null>(null);
  const handleSearch = (city: string) => {
    setLocation(city);
    setLastSearchedCity(city);
  
    // Mock weather data
    setWeather({
      temp: unit === "metric" ? 26 : 79,
      description: "partly cloudy",
      icon: "03d",
      wind: 14,
      humidity: 62,
      forecast: [
        { date: "Mon", temp: unit === "metric" ? 25 : 77, icon: "04d" },
        { date: "Tue", temp: unit === "metric" ? 28 : 82, icon: "01d" },
        { date: "Wed", temp: unit === "metric" ? 23 : 73, icon: "10d" },
      ],
    });
  };

  const handleToggle = (newUnit: "metric" | "imperial") => {
    setUnit(newUnit);
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-base-200 text-base-content flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Weather Forecast</h1>

      <p className="text-sm text-gray-500 mb-4">
        {new Date().toLocaleDateString()} — <span className="font-medium">{location}</span>
      </p>

      <div className="w-full max-w-md">
        <SearchBox onSearch={handleSearch} />
        <div className="my-4 flex justify-center">
          <TempToggle unit={unit} onToggle={handleToggle} />
        </div>
      </div>

      {weather && (
        <>
          <CurrentWeatherCard
            temp={weather.temp}
            description={weather.description}
            icon={weather.icon}
            unit={unit}
          />

          <div className="mt-6 grid grid-cols-3 gap-4">
            {weather.forecast.map((day, idx) => (
              <ForecastCard
                key={idx}
                date={day.date}
                temp={day.temp}
                icon={day.icon}
                unit={unit}
              />
            ))}
          </div>

          <WeatherStats wind={weather.wind} humidity={weather.humidity} />
        </>
      )}
    </main>
  );
}
