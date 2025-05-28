import { NextResponse } from 'next/server'
import { MOCK_PROPERTIES, Property } from '@/constants/mock-data'

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50))
  
  return NextResponse.json({
    success: true,
    data: MOCK_PROPERTIES
  })
}

export async function POST(request: Request) {
  try {
    const newProperty: Omit<Property, 'PropertyID'> = await request.json()
    
    // Generate new ID (in real app, this would be handled by database)
    const newId = Math.max(...MOCK_PROPERTIES.map(p => p.PropertyID)) + 1
    
    const property: Property = {
      ...newProperty,
      PropertyID: newId
    }
    
    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      data: property
    })
  } catch (error) {
    console.error('Failed to create property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create property' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { properties }: { properties: Property[] } = await request.json()
    
    // In a real app, you would save to database here
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Properties updated successfully',
      data: properties
    })
  } catch (error) {
    console.error('Failed to update properties:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update properties' },
      { status: 500 }
    )
  }
} 