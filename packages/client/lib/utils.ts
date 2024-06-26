import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function twCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
