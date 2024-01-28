import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formateDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0')

  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
