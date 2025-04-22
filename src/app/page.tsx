"use client";

import { useState } from "react";
import SearchBox from "./components/SearchBox";
import Head from "next/head";
import TempToggle from "./components/TempToggle";
import CurrentWeatherCard from "./components/CurrentWeatherCard";

export default function Home() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
    icon: string;
  } | null>(null);

  const handleSearch = (city: string) => {
    console.log(`Search for ${city} using ${unit}`);
    // Simulate API response for now
    setWeather({
      temp: unit === "metric" ? 23 : 74,
      description: "light rain",
      icon: "10d",
    });
  };

  const handleToggle = (newUnit: "metric" | "imperial") => {
    setUnit(newUnit);
    // Optionally refetch data for updated unit
  };

  return (
    <main className="min-h-screen p-6 bg-base-200 text-base-content">
      <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>
      <SearchBox onSearch={handleSearch} />
      <div className="my-4">
        <TempToggle unit={unit} onToggle={handleToggle} />
      </div>
      {weather && (
        <div className="mt-6">
          <CurrentWeatherCard
            temp={weather.temp}
            description={weather.description}
            icon={weather.icon}
            unit={unit}
          />
        </div>
      )}
    </main>
  );
}
