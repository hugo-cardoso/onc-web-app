import type { Procedure } from '../types';

const STORAGE_NAME = 'ONC_PINNED_PROCEDURES';

export const localStoragePinnedProceduresService = {
  get: (): Procedure[] => {
    if (typeof window === "undefined") return [];

    const pinned = window.localStorage.getItem(STORAGE_NAME);
    return pinned ? JSON.parse(pinned) : [];
  },

  set: (pinned: Procedure[]) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(STORAGE_NAME, JSON.stringify(pinned));
  }
};