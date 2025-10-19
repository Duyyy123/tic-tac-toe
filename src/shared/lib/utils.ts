import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrSetPlayerId(): string {
  let playerId = document.cookie.split('; ').find(row => row.startsWith('playerId='))?.split('=')[1];

  if (!playerId) {
    playerId = Math.random().toString(36).substring(2, 15);
    document.cookie = `playerId=${playerId}; path=/; max-age=31536000`; // Expires in 1 year
  }

  return playerId;
}
