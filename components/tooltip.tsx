'use client'

import { OccupancyData, Booking } from '@/constants/mock-data'
import moment from 'moment'

interface TooltipProps {
  isVisible: boolean
  position: { x: number; y: number }
  roomNumber: string
  date: string
  occupancyData?: OccupancyData[]
  bookingData?: Booking | null
}

const Tooltip: React.FC<TooltipProps> = ({
  isVisible,
  position,
  roomNumber,
  date,
  occupancyData = [],
  bookingData = null
}) => {
  console.log('Tooltip render:', { isVisible, roomNumber, date, bookingData })
  
  if (!isVisible) return null

  // Find occupancy data for the specific date
  const dayOccupancy = occupancyData.find(data => data.date === date)
  const roomOccupancy = dayOccupancy?.rooms[roomNumber]

  return (
    <div
      className="fixed z-[10000] bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-sm min-w-[250px]"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        pointerEvents: 'none'
      }}
    >
      {/* Header */}
      <div className="border-b border-gray-200 pb-2 mb-3">
        <div className="text-sm font-bold text-gray-800">
          Room {roomNumber}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
      
      {/* Booking Information */}
      {bookingData ? (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-md p-3 space-y-2">
            <div className="text-sm font-semibold text-blue-800 mb-2">
              📅 Booking Details
            </div>
            
            {/* Guest Name */}
            {bookingData.text && (
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-gray-600">Guest:</span>
                <span className="text-xs text-gray-800 text-right ml-2 font-medium">
                  {bookingData.text}
                </span>
              </div>
            )}

            {/* Booking ID */}
            {bookingData.id && (
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Booking ID:</span>
                <span className="text-xs text-gray-800 font-mono">
                  {bookingData.id}
                </span>
              </div>
            )}

            {/* Duration */}
            {bookingData.start_time && bookingData.end_time && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600">Check-in:</span>
                  <span className="text-xs text-gray-800">
                    {moment(bookingData.start_time).format('MMM DD, YYYY')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600">Check-out:</span>
                  <span className="text-xs text-gray-800">
                    {moment(bookingData.end_time).format('MMM DD, YYYY')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600">Duration:</span>
                  <span className="text-xs text-gray-800 font-medium">
                    {moment(bookingData.end_time).diff(moment(bookingData.start_time), 'days')} night(s)
                  </span>
                </div>
              </div>
            )}

            {/* Status indicators */}
            <div className="flex items-center space-x-2 pt-1">
              {/* Move status */}
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  bookingData.canMove === false ? 'bg-red-500' : 'bg-green-500'
                }`} />
                <span className="text-xs text-gray-600">
                  {bookingData.canMove === false ? 'Fixed' : 'Movable'}
                </span>
              </div>

              {/* Resize status */}
              {bookingData.canResize !== undefined && (
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    bookingData.canResize === false ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  <span className="text-xs text-gray-600">
                    {bookingData.canResize === false ? 'Fixed Length' : 'Resizable'}
                  </span>
                </div>
              )}
            </div>

            {/* Icons */}
            {bookingData.icons && bookingData.icons.length > 0 && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-medium text-gray-600">Special:</span>
                <div className="flex space-x-1">
                  {bookingData.icons.includes('heart') && <span className="text-sm">❤️</span>}
                  {bookingData.icons.includes('thumbsup') && <span className="text-sm">👍</span>}
                </div>
              </div>
            )}

            {/* Color indicator */}
            {bookingData.color && (
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Status Color:</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${bookingData.color}`} />
                  <span className="text-xs text-gray-600 capitalize">
                    {bookingData.color.replace('bg-', '').replace('-', ' ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Fallback to occupancy data if no booking data */
        roomOccupancy ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div 
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  roomOccupancy.isOccupied ? 'bg-red-500' : 'bg-green-500'
                }`}
              />
              <span className={`text-sm font-medium ${
                roomOccupancy.isOccupied ? 'text-red-700' : 'text-green-700'
              }`}>
                {roomOccupancy.isOccupied ? 'Occupied' : 'Available'}
              </span>
            </div>
            
            {roomOccupancy.isOccupied && (
              <div className="bg-gray-50 rounded-md p-3 space-y-2">
                {roomOccupancy.guestName && (
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-gray-600">Guest:</span>
                    <span className="text-xs text-gray-800 text-right ml-2">
                      {roomOccupancy.guestName}
                    </span>
                  </div>
                )}
                
                {roomOccupancy.reservationId && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Reservation:</span>
                    <span className="text-xs text-gray-800 font-mono">
                      #{roomOccupancy.reservationId}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0" />
            <span className="text-xs">No booking data available</span>
          </div>
        )
      )}
      
      {/* Tooltip arrow */}
      <div 
        className="absolute w-3 h-3 bg-white border-l border-t border-gray-300 transform rotate-45"
        style={{
          left: -6,
          top: 20
        }}
      />
    </div>
  )
}

export default Tooltip 