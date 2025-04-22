"use client";

import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center p-4">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary ">
        Search
      </button>
    </form>
  );
}
