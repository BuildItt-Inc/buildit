// lib/utils.ts

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names intelligently, resolving conflicts.
 * Drop-in compatible with shadcn/ui's cn() utility.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
