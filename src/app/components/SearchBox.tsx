"use client";

import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
  loading?: boolean;
};

export default function SearchBox({ onSearch, loading = false }: Props) {
  const [city, setCity] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex items-center gap-3 glass rounded-2xl px-5 py-3 transition-smooth ${
          focused ? "ring-2 ring-blue-400/40 bg-white/15" : ""
        }`}
      >
        {/* Search icon */}
        <svg
          className="w-5 h-5 text-white/50 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-white placeholder-white/40 text-base outline-none"
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loading || city.trim() === ""}
          className="shrink-0 bg-blue-500 hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-smooth active:scale-95"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
}
