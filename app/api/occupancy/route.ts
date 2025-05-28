import { NextResponse } from 'next/server'
import { MOCK_OCCUPANCY_DATA, OccupancyData } from '@/constants/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50))
  
  if (date) {
    // Return occupancy data for specific date
    const occupancyForDate = MOCK_OCCUPANCY_DATA.find(od => od.date === date)
    
    if (occupancyForDate) {
      return NextResponse.json({
        success: true,
        data: occupancyForDate
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'No occupancy data found for the specified date'
      }, { status: 404 })
    }
  }
  
  // Return all occupancy data
  return NextResponse.json({
    success: true,
    data: MOCK_OCCUPANCY_DATA
  })
}

export async function POST(request: Request) {
  try {
    const newOccupancyData: OccupancyData = await request.json()
    
    // In a real app, you would save to database here
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Occupancy data created successfully',
      data: newOccupancyData
    })
  } catch (error) {
    console.error('Failed to create occupancy data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create occupancy data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { occupancyData }: { occupancyData: OccupancyData[] } = await request.json()
    
    // In a real app, you would save to database here
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Occupancy data updated successfully',
      data: occupancyData
    })
  } catch (error) {
    console.error('Failed to update occupancy data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update occupancy data' },
      { status: 500 }
    )
  }
} 