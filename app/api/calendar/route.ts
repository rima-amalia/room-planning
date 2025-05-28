import { NextResponse } from 'next/server'
import { MOCK_CALENDAR_DAYS, CalendarDay } from '@/constants/mock-data'

// Re-export type for backward compatibility
export type { CalendarDay }

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50))
  
  return NextResponse.json({
    success: true,
    data: {
      month: "AUG 2023",
      days: MOCK_CALENDAR_DAYS
    }
  })
} 