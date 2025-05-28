import { NextResponse } from 'next/server'
import { MOCK_ROOM_TYPES, RoomType } from '@/constants/mock-data'

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50))
  
  return NextResponse.json({
    success: true,
    data: MOCK_ROOM_TYPES
  })
}

export async function POST(request: Request) {
  try {
    const newRoomType: Omit<RoomType, 'RoomTypeID'> = await request.json()
    
    // Generate new ID (in real app, this would be handled by database)
    const newId = Math.max(...MOCK_ROOM_TYPES.map(rt => rt.RoomTypeID)) + 1
    
    const roomType: RoomType = {
      ...newRoomType,
      RoomTypeID: newId
    }
    
    return NextResponse.json({
      success: true,
      message: 'Room type created successfully',
      data: roomType
    })
  } catch (error) {
    console.error('Failed to create room type:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create room type' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { roomTypes }: { roomTypes: RoomType[] } = await request.json()
    
    // In a real app, you would save to database here
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Room types updated successfully',
      data: roomTypes
    })
  } catch (error) {
    console.error('Failed to update room types:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update room types' },
      { status: 500 }
    )
  }
} 