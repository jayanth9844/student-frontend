import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals: number = 1): string {
  if (num === undefined || num === null) return 'N/A'
  // Remove unnecessary decimal places
  const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
  return decimals === 0 ? rounded.toString() : rounded.toFixed(decimals)
}

export function calculatePercentile(value: number, values: number[]): number {
  const sorted = values.sort((a, b) => a - b)
  const index = sorted.findIndex(v => v >= value)
  return (index / sorted.length) * 100
}

export function downloadCSV(data: any[], filename: string) {
  const csvContent = convertToCSV(data)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      }).join(',')
    )
  ]
  
  return csvRows.join('\n')
}
