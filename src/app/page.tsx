"use client";

import { useState, useEffect, useCallback } from "react";
import SearchBox from "./components/SearchBox";
import TempToggle from "./components/TempToggle";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import WeatherStats from "./components/WeatherStats";
import PinnedCityCard from "./components/PinnedCityCard";
import { type PinnedWeatherData } from "./components/PinnedCityCard";
import { useFavorites } from "./hooks/useFavorites";

const API_BASE = "http://localhost:8000/api";

type WeatherData = {
  temp: number;
  description: string;
  icon: string;
  wind: number;
  humidity: number;
  forecast: { date: string; temp: number; icon: string }[];
};

export default function Home() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Favorites
  const { favorites, loaded: favLoaded, isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const [pinnedData, setPinnedData] = useState<Record<string, PinnedWeatherData>>({});
  const [pinnedLoading, setPinnedLoading] = useState<Record<string, boolean>>({});

  // Fetch weather for a single city (returns data)
  const fetchCityWeather = useCallback(
    async (city: string, units: "metric" | "imperial"): Promise<PinnedWeatherData | null> => {
      try {
        const res = await fetch(
          `${API_BASE}/weather?city=${encodeURIComponent(city)}&units=${units}`
        );
        if (!res.ok) return null;
        const data = await res.json();
        return {
          city: data.city,
          country: data.country,
          temp: data.temp,
          description: data.description,
          icon: data.icon,
          wind: data.wind,
          humidity: data.humidity,
        };
      } catch {
        return null;
      }
    },
    []
  );

  // Fetch weather for all pinned cities
  const fetchAllPinned = useCallback(
    async (units: "metric" | "imperial") => {
      if (favorites.length === 0) return;

      // Mark all as loading
      const loadingState: Record<string, boolean> = {};
      favorites.forEach((f) => (loadingState[f.query] = true));
      setPinnedLoading(loadingState);

      const results: Record<string, PinnedWeatherData> = {};
      await Promise.all(
        favorites.map(async (fav) => {
          const data = await fetchCityWeather(fav.query, units);
          if (data) results[fav.query] = data;
        })
      );

      setPinnedData(results);
      setPinnedLoading({});
    },
    [favorites, fetchCityWeather]
  );

  // Fetch pinned cities on mount and when favorites change
  useEffect(() => {
    if (favLoaded && favorites.length > 0) {
      fetchAllPinned(unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favLoaded, favorites.length]);

  // Main search
  const fetchWeather = async (city: string, units: "metric" | "imperial") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE}/weather?city=${encodeURIComponent(city)}&units=${units}`
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to fetch weather");
      }
      const data = await res.json();
      setLocation(`${data.city}${data.country ? ", " + data.country : ""}`);
      setWeather({
        temp: data.temp,
        description: data.description,
        icon: data.icon,
        wind: data.wind,
        humidity: data.humidity,
        forecast: data.forecast,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    setLastSearchedCity(city);
    fetchWeather(city, unit);
  };

  const handleToggle = (newUnit: "metric" | "imperial") => {
    setUnit(newUnit);
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity, newUnit);
    }
    // Re-fetch pinned cities with new unit
    if (favorites.length > 0) {
      // Slight delay so unit state updates first
      setTimeout(() => fetchAllPinned(newUnit), 50);
    }
  };

  const handlePinToggle = () => {
    if (lastSearchedCity && location) {
      toggleFavorite(lastSearchedCity, location);
    }
  };

  const handlePinnedClick = (query: string) => {
    setLastSearchedCity(query);
    fetchWeather(query, unit);
  };

  const handleUnpin = (query: string) => {
    removeFavorite(query);
    setPinnedData((prev) => {
      const next = { ...prev };
      delete next[query];
      return next;
    });
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hasPinned = favorites.length > 0;

  return (
    <main className="min-h-screen weather-bg text-white flex flex-col items-center selection:bg-blue-400/30">
      {/* Header */}
      <header className="w-full max-w-2xl px-6 pt-10 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
              WeatherNow
            </h1>
            <p className="text-white/40 text-sm mt-0.5">{currentDate}</p>
          </div>
          <TempToggle unit={unit} onToggle={handleToggle} />
        </div>

        <SearchBox onSearch={handleSearch} loading={loading} />
      </header>

      {/* Content area */}
      <section className="w-full max-w-2xl px-6 flex-1 flex flex-col items-center pb-12">
        {/* Pinned / Favorite cities */}
        {hasPinned && (
          <div className="w-full max-w-sm mb-8 animate-fade-in">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 px-1 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-amber-400/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              Favorite Cities
            </h3>
            <div className="flex flex-col gap-3">
              {favorites.map((fav) => (
                <PinnedCityCard
                  key={fav.query}
                  data={
                    pinnedData[fav.query] || {
                      city: fav.label,
                      country: "",
                      temp: 0,
                      description: "Loading...",
                      icon: "03d",
                      wind: 0,
                      humidity: 0,
                    }
                  }
                  unit={unit}
                  loading={!!pinnedLoading[fav.query]}
                  onUnpin={() => handleUnpin(fav.query)}
                  onClick={() => handlePinnedClick(fav.query)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 animate-fade-in">
            <svg className="w-20 h-20 text-white/15 mb-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
            <h2 className="text-xl font-semibold text-white/30 mb-2">Search for a city</h2>
            <p className="text-white/20 text-sm max-w-xs">
              Enter a city name above to get the current weather conditions and forecast.
              {!hasPinned && " Pin your favorite cities to see them here."}
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-blue-400 animate-spin" />
            </div>
            <p className="text-white/40 text-sm mt-6">Fetching weather data...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="glass rounded-2xl p-6 text-center mt-8 animate-fade-in max-w-sm">
            <svg className="w-12 h-12 text-red-400/70 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-red-300 font-medium">{error}</p>
            <p className="text-white/30 text-sm mt-1">Please try another city name.</p>
          </div>
        )}

        {/* Weather results */}
        {weather && !loading && (
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Current weather */}
            <CurrentWeatherCard
              temp={weather.temp}
              description={weather.description}
              icon={weather.icon}
              unit={unit}
              city={location || undefined}
              isPinned={lastSearchedCity ? isFavorite(lastSearchedCity) : false}
              onTogglePin={lastSearchedCity ? handlePinToggle : undefined}
            />

            {/* Forecast section */}
            <div className="w-full max-w-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 px-1">
                3-Day Forecast
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {weather.forecast.map((day, idx) => (
                  <ForecastCard
                    key={idx}
                    date={day.date}
                    temp={day.temp}
                    icon={day.icon}
                    unit={unit}
                    index={idx}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="w-full max-w-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 px-1">
                Conditions
              </h3>
              <WeatherStats wind={weather.wind} humidity={weather.humidity} unit={unit} />
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-white/20 text-xs">
        Powered by Open-Meteo &middot; Built with Next.js & Laravel
      </footer>
    </main>
  );
}
