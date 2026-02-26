"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "weathernow_favorites";

export type FavoriteCity = {
  /** The city query string used for the API (e.g. "Nairobi") */
  query: string;
  /** Display label (e.g. "Nairobi, KE") */
  label: string;
  /** Timestamp when pinned */
  pinnedAt: number;
};

/**
 * Hook to manage favorite/pinned cities via localStorage.
 * Returns the list plus helpers to add, remove, and check.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setFavorites(JSON.parse(raw));
      }
    } catch {
      // Corrupted data — reset
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoaded(true);
  }, []);

  // Persist whenever favorites change (but not on initial load)
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  const addFavorite = useCallback((query: string, label: string) => {
    setFavorites((prev) => {
      // Prevent duplicates (case-insensitive on query)
      if (prev.some((f) => f.query.toLowerCase() === query.toLowerCase())) {
        return prev;
      }
      return [...prev, { query, label, pinnedAt: Date.now() }];
    });
  }, []);

  const removeFavorite = useCallback((query: string) => {
    setFavorites((prev) =>
      prev.filter((f) => f.query.toLowerCase() !== query.toLowerCase())
    );
  }, []);

  const isFavorite = useCallback(
    (query: string) => {
      return favorites.some(
        (f) => f.query.toLowerCase() === query.toLowerCase()
      );
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (query: string, label: string) => {
      if (isFavorite(query)) {
        removeFavorite(query);
      } else {
        addFavorite(query, label);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return {
    favorites,
    loaded,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
