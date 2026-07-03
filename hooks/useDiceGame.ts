import { useCallback, useEffect, useRef, useState } from 'react';
import { GuessType, HistoryItem, PlayErrorResponse, PlayResponse } from '@/types/game';
import { MAX_HISTORY, THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';

function isPlayError(data: PlayResponse | PlayErrorResponse): data is PlayErrorResponse {
  return 'error' in data;
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function createHistoryItem(data: PlayResponse, threshold: number, guess: GuessType): HistoryItem {
  return { ...data, id: crypto.randomUUID(), threshold, guess, time: getCurrentTime() };
}

export function useDiceGame() {
  const [threshold, setThreshold] = useState(Math.round((THRESHOLD_MIN + THRESHOLD_MAX) / 2));
  const [guess, setGuess] = useState<GuessType>('under');
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<PlayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const handlePlay = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setLastResult(null);

    try {
      const res = await fetch('/api/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threshold, guess }),
        signal: controller.signal,
      });

      const data: PlayResponse | PlayErrorResponse = await res.json();

      if (isPlayError(data)) {
        setError(data.error);
        return;
      }

      if (!res.ok) {
        throw new Error('Server error');
      }

      setLastResult(data);
      setHistory(prev => [createHistoryItem(data, threshold, guess), ...prev].slice(0, MAX_HISTORY));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      setError('Failed to play. Please try again.');
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, [threshold, guess]);

  return {
    threshold,
    setThreshold,
    guess,
    setGuess,
    loading,
    lastResult,
    error,
    history,
    handlePlay,
  };
}
