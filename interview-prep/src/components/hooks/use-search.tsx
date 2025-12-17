import { useState, useEffect, useRef } from "react";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastCalled = useRef<number>(0);

  const fetchResult = (query: string) => {
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch(() => setResults([]));
  };

  useEffect(() => {
    const now = Date.now();

    const elapsed = now - lastCalled.current;
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (elapsed > 1000) {
      fetchResult(query);
      lastCalled.current = now;
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        lastCalled.current = Date.now();
        fetchResult(query);
      }, 1000 - elapsed);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query]);

  return { query, results, setQuery };
};
