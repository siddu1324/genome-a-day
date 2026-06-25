"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export const LOGBOOK_KEYS = {
  readSpecimens: "genome-day:read-specimens",
  savedSpecimens: "genome-day:saved-specimens",
  lastVisit: "genome-day:last-visit",
  streak: "genome-day:streak",
} as const;

export type LogbookSnapshot = {
  readSpecimens: string[];
  savedSpecimens: string[];
  lastVisit: string | null;
  streak: number;
};

const emptySnapshot: LogbookSnapshot = {
  readSpecimens: [],
  savedSpecimens: [],
  lastVisit: null,
  streak: 0,
};

let snapshot: LogbookSnapshot = emptySnapshot;
const listeners = new Set<() => void>();

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const milliseconds = endDate.getTime() - startDate.getTime();
  return Math.round(milliseconds / 86_400_000);
}

function readList(key: string) {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readNumber(key: string) {
  if (!canUseStorage()) {
    return 0;
  }

  const stored = window.localStorage.getItem(key);
  const parsed = stored ? Number.parseInt(stored, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function readStoredSnapshot(): LogbookSnapshot {
  if (!canUseStorage()) {
    return snapshot;
  }

  return {
    readSpecimens: readList(LOGBOOK_KEYS.readSpecimens),
    savedSpecimens: readList(LOGBOOK_KEYS.savedSpecimens),
    lastVisit: window.localStorage.getItem(LOGBOOK_KEYS.lastVisit),
    streak: readNumber(LOGBOOK_KEYS.streak),
  };
}

function writeStoredSnapshot(nextSnapshot: LogbookSnapshot) {
  snapshot = nextSnapshot;

  if (canUseStorage()) {
    window.localStorage.setItem(LOGBOOK_KEYS.readSpecimens, JSON.stringify(nextSnapshot.readSpecimens));
    window.localStorage.setItem(LOGBOOK_KEYS.savedSpecimens, JSON.stringify(nextSnapshot.savedSpecimens));
    if (nextSnapshot.lastVisit) {
      window.localStorage.setItem(LOGBOOK_KEYS.lastVisit, nextSnapshot.lastVisit);
    }
    window.localStorage.setItem(LOGBOOK_KEYS.streak, String(nextSnapshot.streak));
  }

  listeners.forEach((listener) => listener());
}

function withVisit(nextSnapshot: LogbookSnapshot) {
  const today = todayKey();
  const lastVisit = nextSnapshot.lastVisit;

  if (lastVisit === today) {
    return nextSnapshot.streak > 0 ? nextSnapshot : { ...nextSnapshot, streak: 1 };
  }

  const streak = lastVisit && daysBetween(lastVisit, today) === 1 ? nextSnapshot.streak + 1 : 1;
  return { ...nextSnapshot, lastVisit: today, streak };
}

function uniquePush(items: string[], item: string) {
  return items.includes(item) ? items : [...items, item];
}

export function hydrateLogbook() {
  snapshot = readStoredSnapshot();
  listeners.forEach((listener) => listener());
}

export function markSpecimenRead(specimenId: string) {
  const stored = withVisit(readStoredSnapshot());
  writeStoredSnapshot({
    ...stored,
    readSpecimens: uniquePush(stored.readSpecimens, specimenId),
  });
}

export function saveSpecimen(specimenId: string) {
  const stored = withVisit(readStoredSnapshot());
  writeStoredSnapshot({
    ...stored,
    readSpecimens: uniquePush(stored.readSpecimens, specimenId),
    savedSpecimens: uniquePush(stored.savedSpecimens, specimenId),
  });
}

export function useLogbook() {
  useEffect(() => {
    hydrateLogbook();
  }, []);

  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      window.addEventListener("storage", hydrateLogbook);

      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", hydrateLogbook);
      };
    },
    () => snapshot,
    () => emptySnapshot,
  );
}

export function useMarkSpecimenRead(specimenId: string) {
  useEffect(() => {
    markSpecimenRead(specimenId);
  }, [specimenId]);
}

export function useSaveSpecimen(specimenId: string) {
  const logbook = useLogbook();

  const save = useCallback(() => {
    saveSpecimen(specimenId);
  }, [specimenId]);

  return {
    save,
    isSaved: logbook.savedSpecimens.includes(specimenId),
    isRead: logbook.readSpecimens.includes(specimenId),
    logbook,
  };
}
