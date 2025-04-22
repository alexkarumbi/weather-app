"use client";

import { useState } from "react";

type Props = {
  unit: "metric" | "imperial";
  onToggle: (unit: "metric" | "imperial") => void;
};

export default function TempToggle({ unit, onToggle }: Props) {
  const handleChange = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    onToggle(newUnit);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold">°C</span>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={unit === "imperial"}
        onChange={handleChange}
      />
      <span className="font-semibold">°F</span>
    </div>
  );
}
