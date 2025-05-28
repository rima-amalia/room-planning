import { NextResponse } from 'next/server'
import { MOCK_LEGACY_ROOMS, LegacyRoom, Booking } from '@/constants/mock-data'

// Re-export types for backward compatibility
export type { LegacyRoom as Room, Booking }

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return NextResponse.json({
    success: true,
    data: MOCK_LEGACY_ROOMS
  })
}

export async function PUT(request: Request) {
  try {
    const { rooms } = await request.json()
    
    // In a real app, you would save to database here
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Rooms updated successfully',
      data: rooms
    })
  } catch (error) {
    console.error('Failed to update rooms:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update rooms' },
      { status: 500 }
    )
  }
} 