import { NextResponse } from 'next/server'
import { MOCK_ROOMS, Room } from '@/constants/mock-data'

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return NextResponse.json({
    success: true,
    data: MOCK_ROOMS
  })
}

export async function PUT(request: Request) {
  try {
    const { rooms }: { rooms: Room[] } = await request.json()
    
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

export async function POST(request: Request) {
  try {
    const newRoom: Omit<Room, 'RoomID'> = await request.json()
    
    // Generate new ID (in real app, this would be handled by database)
    const newId = Math.max(...MOCK_ROOMS.map(r => r.RoomID)) + 1
    
    const room: Room = {
      ...newRoom,
      RoomID: newId
    }
    
    return NextResponse.json({
      success: true,
      message: 'Room created successfully',
      data: room
    })
  } catch (error) {
    console.error('Failed to create room:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create room' },
      { status: 500 }
    )
  }
} 