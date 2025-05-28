export interface Room {
  RoomID: number
  PropertyID: number
  RoomTypeID: number
  RoomNumber: string
  FloorNumber?: string
  Status?: string
  Notes?: string
  roomType?: RoomType
  property?: Property
  isLocked?: boolean
}

export interface RoomType {
  RoomTypeID: number
  PropertyID: number
  RoomTypeCode: string
  Description: string
  MaxOccupancy?: number
  BedType?: string
  StandardRate?: number
  property?: Property
}

export interface Property {
  PropertyID: number
  PropertyCode: string
  PropertyName: string
  Address?: string
  City?: string
  State?: string
  Country?: string
  PostalCode?: string
  Phone?: string
  Email?: string
  CheckInTime?: string
  CheckOutTime?: string
}

export interface RoomOccupancy {
  RoomID: number
  RoomNumber: string
  FloorNumber: string | null
  Status: string
  RoomType: RoomType
}

export interface OccupancyData {
  date: string
  rooms: {
    [roomId: string]: {
      isOccupied: boolean
      guestName?: string
      reservationId?: number
    }
  }
}

export interface CalendarDay {
  day: string
  date: number
}

export interface Booking {
  id: string;
  group?: string;
  title?: string;
  start_time?: number;
  end_time?: number;
  canMove?: boolean;
  canResize?: boolean;
  itemProps?: {
    style?: React.CSSProperties;
  };
  // Legacy properties for backward compatibility
  day?: number;
  text?: string;
  color?: string;
  length?: number;
  icons?: string[];
}

export interface Group {
  id: string;
  title: string;
}

export interface MoveConfirmation {
  isOpen: boolean;
  itemId: string;
  newStartTime: number;
  newEndTime: number;
  newGroupId: string;
  oldStartTime: number;
  oldEndTime: number;
  oldGroupId: string;
}

export interface NewBookingForm {
  isOpen: boolean;
  roomId: string;
  startDate: string;
  endDate: string;
  guestName: string;
}

export interface DeleteConfirmation {
  isOpen: boolean;
  bookingId: string;
  guestName: string;
}

// Legacy interface for backward compatibility
export interface LegacyRoom {
  number: string
  type: string
  status: string
  bookings: Booking[]
}

// Helper function to get the target month (June 2025)
export const getTargetMonth = () => {
  // Return June 2025 specifically
  const targetDate = new Date(2025, 5, 1) // Month is 0-indexed, so 5 = June
  return targetDate
}

// Helper function to get month info
export const getMonthInfo = () => {
  const targetDate = getTargetMonth()
  const year = targetDate.getFullYear()
  const month = targetDate.getMonth()
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  
  return {
    year,
    month,
    monthName: monthNames[month],
    displayName: `${monthNames[month]} ${year}`,
    startDate: new Date(year, month, 1),
    endDate: new Date(year, month + 1, 0)
  }
}

// Helper function to generate calendar days for the target month
export const generateCalendarDays = (): CalendarDay[] => {
  const monthInfo = getMonthInfo()
  const daysInMonth = monthInfo.endDate.getDate()
  const days: CalendarDay[] = []
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(monthInfo.year, monthInfo.month, day)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    days.push({
      day: dayNames[date.getDay()],
      date: day
    })
  }
  
  return days
}

// Mock Properties
export const MOCK_PROPERTIES: Property[] = [
  {
    PropertyID: 1,
    PropertyCode: "PROP001",
    PropertyName: "Grand Hotel",
    Address: "123 Main Street",
    City: "Jakarta",
    State: "DKI Jakarta",
    Country: "Indonesia",
    PostalCode: "12345",
    Phone: "+62-21-1234567",
    Email: "info@grandhotel.com",
    CheckInTime: "14:00",
    CheckOutTime: "12:00"
  }
]

// Mock Room Types
export const MOCK_ROOM_TYPES: RoomType[] = [
  {
    RoomTypeID: 1,
    PropertyID: 1,
    RoomTypeCode: "GLSK",
    Description: "Guest Single King",
    MaxOccupancy: 2,
    BedType: "King",
    StandardRate: 150000
  },
  {
    RoomTypeID: 2,
    PropertyID: 1,
    RoomTypeCode: "DBPK",
    Description: "Double King",
    MaxOccupancy: 4,
    BedType: "King",
    StandardRate: 200000
  },
  {
    RoomTypeID: 3,
    PropertyID: 1,
    RoomTypeCode: "DLXK",
    Description: "Deluxe King",
    MaxOccupancy: 4,
    BedType: "King",
    StandardRate: 300000
  }
]

// Mock Rooms
export const MOCK_ROOMS: Room[] = [
  {
    RoomID: 101,
    PropertyID: 1,
    RoomTypeID: 1,
    RoomNumber: "101",
    FloorNumber: "1",
    Status: "clean",
    roomType: MOCK_ROOM_TYPES[0],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 102,
    PropertyID: 1,
    RoomTypeID: 1,
    RoomNumber: "102",
    FloorNumber: "1",
    Status: "occupied",
    roomType: MOCK_ROOM_TYPES[0],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 103,
    PropertyID: 1,
    RoomTypeID: 1,
    RoomNumber: "103",
    FloorNumber: "1",
    Status: "clean",
    roomType: MOCK_ROOM_TYPES[0],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 104,
    PropertyID: 1,
    RoomTypeID: 1,
    RoomNumber: "104",
    FloorNumber: "1",
    Status: "occupied",
    roomType: MOCK_ROOM_TYPES[0],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 201,
    PropertyID: 1,
    RoomTypeID: 2,
    RoomNumber: "201",
    FloorNumber: "2",
    Status: "smoking",
    roomType: MOCK_ROOM_TYPES[1],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 202,
    PropertyID: 1,
    RoomTypeID: 2,
    RoomNumber: "202",
    FloorNumber: "2",
    Status: "smoking",
    roomType: MOCK_ROOM_TYPES[1],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 203,
    PropertyID: 1,
    RoomTypeID: 2,
    RoomNumber: "203",
    FloorNumber: "2",
    Status: "smoking-occupied",
    roomType: MOCK_ROOM_TYPES[1],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 204,
    PropertyID: 1,
    RoomTypeID: 2,
    RoomNumber: "204",
    FloorNumber: "2",
    Status: "smoking",
    roomType: MOCK_ROOM_TYPES[1],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 205,
    PropertyID: 1,
    RoomTypeID: 2,
    RoomNumber: "205",
    FloorNumber: "2",
    Status: "smoking",
    roomType: MOCK_ROOM_TYPES[1],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 206,
    PropertyID: 1,
    RoomTypeID: 3,
    RoomNumber: "206",
    FloorNumber: "2",
    Status: "occupied",
    roomType: MOCK_ROOM_TYPES[2],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 207,
    PropertyID: 1,
    RoomTypeID: 3,
    RoomNumber: "207",
    FloorNumber: "2",
    Status: "clean",
    roomType: MOCK_ROOM_TYPES[2],
    property: MOCK_PROPERTIES[0]
  },
  {
    RoomID: 208,
    PropertyID: 1,
    RoomTypeID: 3,
    RoomNumber: "208",
    FloorNumber: "2",
    Status: "clean",
    roomType: MOCK_ROOM_TYPES[2],
    property: MOCK_PROPERTIES[0]
  }
]

// Helper function to generate mock bookings with dynamic dates
const generateMockBookings = (): { [roomNumber: string]: Booking[] } => {
  const monthInfo = getMonthInfo()
  const daysInMonth = monthInfo.endDate.getDate()
  
  // Generate some sample booking days (spread throughout the month)
  const sampleDays = [
    Math.floor(daysInMonth * 0.1), // ~10% into month
    Math.floor(daysInMonth * 0.2), // ~20% into month
    Math.floor(daysInMonth * 0.35), // ~35% into month
    Math.floor(daysInMonth * 0.5), // ~50% into month
    Math.floor(daysInMonth * 0.65), // ~65% into month
    Math.floor(daysInMonth * 0.8), // ~80% into month
  ].filter(day => day >= 1 && day <= daysInMonth)

  return {
    "101": [{ id: "booking-1", day: sampleDays[0], text: "ANDERSON, Mr John", color: "bg-teal-500", length: 1 }],
    "102": [{ id: "booking-2", day: sampleDays[0], text: "WILLIAMS, Mrs Sarah - Do Not Move", color: "bg-green-500", length: 2 }],
    "103": [],
    "104": [{ id: "booking-21", day: sampleDays[1], text: "SMITH, Mr Robert -", color: "bg-orange-400", length: 1 }],
    "201": [
      { id: "booking-3", day: sampleDays[0], text: "JOHNSON, Ms Emily", color: "bg-green-200", length: 1 },
      { id: "booking-4", day: sampleDays[3], text: "BROWN, Mr Michael", color: "bg-orange-400", length: 1 },
    ],
    "202": [{ id: "booking-5", day: sampleDays[3], text: "DAVIS, Mrs Jennifer", color: "bg-orange-400", length: 1 }],
    "203": [{ id: "booking-6", day: sampleDays[0], text: "MILLER, Mr David", color: "bg-green-200", length: 1 }],
    "204": [
      { id: "booking-7", day: sampleDays[0], text: "WILSON, Mrs Lisa", color: "bg-orange-300", length: 1 },
      { id: "booking-8", day: sampleDays[3], text: "MOORE, Mr Robert", color: "bg-orange-400", length: 1, icons: ["heart"] },
    ],
    "205": [],
    "206": [
      { id: "booking-9", day: sampleDays[0], text: "TAYLOR, Ms Amanda", color: "bg-green-500", length: 1 },
      { id: "booking-10", day: sampleDays[2], text: "ANDERSON, Mrs Karen", color: "bg-orange-400", length: 1, icons: ["thumbsup", "heart"] },
      { id: "booking-11", day: sampleDays[4], text: "THOMAS, Mr James", color: "bg-orange-400", length: 1 },
      { id: "booking-12", day: sampleDays[5], text: "JACKSON, Ms Michelle", color: "bg-orange-400", length: 1 },
    ],
    "207": [
      { id: "booking-13", day: sampleDays[0], text: "WHITE, Mr Christopher", color: "bg-orange-300", length: 1 },
      { id: "booking-14", day: sampleDays[1], text: "HARRIS, Mrs Rebecca", color: "bg-orange-300", length: 1, icons: ["thumbsup"] },
      { id: "booking-15", day: sampleDays[2], text: "MARTIN, Mr Daniel", color: "bg-orange-400", length: 1, icons: ["thumbsup", "heart"] },
      { id: "booking-16", day: sampleDays[5], text: "THOMPSON, Ms Jessica", color: "bg-orange-400", length: 1 },
    ],
    "208": [
      { id: "booking-17", day: sampleDays[1], text: "GARCIA, Mr Carlos", color: "bg-orange-300", length: 1, icons: ["thumbsup"] },
      { id: "booking-18", day: sampleDays[2], text: "RODRIGUEZ, Mrs Maria", color: "bg-orange-400", length: 1, icons: ["thumbsup", "heart"] },
      { id: "booking-19", day: sampleDays[5], text: "LEWIS, Mr William", color: "bg-orange-400", length: 1 },
    ],
  }
}

// Mock Bookings for backward compatibility with timeline
export const MOCK_BOOKINGS: { [roomNumber: string]: Booking[] } = generateMockBookings()

// Legacy rooms format for backward compatibility
export const MOCK_LEGACY_ROOMS: LegacyRoom[] = MOCK_ROOMS.map(room => ({
  number: room.RoomNumber,
  type: room.roomType?.RoomTypeCode || "",
  status: room.Status || "clean",
  bookings: MOCK_BOOKINGS[room.RoomNumber] || []
}))

// Mock Calendar Days - now generated dynamically
export const MOCK_CALENDAR_DAYS: CalendarDay[] = generateCalendarDays()

// Helper function to generate occupancy data
const generateOccupancyData = (): OccupancyData[] => {
  const monthInfo = getMonthInfo()
  const firstBookingDay = Math.floor(monthInfo.endDate.getDate() * 0.1)
  const targetDate = new Date(monthInfo.year, monthInfo.month, firstBookingDay)
  
  return [
    {
      date: targetDate.toISOString().split('T')[0],
      rooms: {
        "101": { isOccupied: true, guestName: "ANDERSON, Mr John", reservationId: 1001 },
        "102": { isOccupied: true, guestName: "WILLIAMS, Mrs Sarah", reservationId: 1002 },
        "103": { isOccupied: false },
        "104": { isOccupied: false },
        "201": { isOccupied: true, guestName: "JOHNSON, Ms Emily", reservationId: 1003 },
        "202": { isOccupied: false },
        "203": { isOccupied: true, guestName: "MILLER, Mr David", reservationId: 1004 },
        "204": { isOccupied: true, guestName: "WILSON, Mrs Lisa", reservationId: 1005 },
        "205": { isOccupied: false },
        "206": { isOccupied: true, guestName: "TAYLOR, Ms Amanda", reservationId: 1006 },
        "207": { isOccupied: true, guestName: "WHITE, Mr Christopher", reservationId: 1007 },
        "208": { isOccupied: false },
      }
    }
  ]
}

// Mock Occupancy Data - now generated dynamically
export const MOCK_OCCUPANCY_DATA: OccupancyData[] = generateOccupancyData()

// Mock Groups for timeline/calendar functionality
export const MOCK_GROUPS: Group[] = MOCK_ROOMS.map(room => ({
  id: room.RoomNumber,
  title: `Room ${room.RoomNumber} (${room.roomType?.RoomTypeCode})`
}))

// Helper function to generate timeline bookings with proper timestamps
const generateTimelineBookings = (): Booking[] => {
  const monthInfo = getMonthInfo()
  const firstBookingDay = Math.floor(monthInfo.endDate.getDate() * 0.1)
  
  const checkInTime = new Date(monthInfo.year, monthInfo.month, firstBookingDay, 14, 0, 0)
  const checkOutTime = new Date(monthInfo.year, monthInfo.month, firstBookingDay + 1, 12, 0, 0)
  const checkOut2Days = new Date(monthInfo.year, monthInfo.month, firstBookingDay + 2, 12, 0, 0)
  
  return [
    {
      id: "booking-timeline-1",
      group: "101",
      title: "ANDERSON, Mr John",
      start_time: checkInTime.getTime(),
      end_time: checkOutTime.getTime(),
      canMove: true,
      canResize: true,
      itemProps: {
        style: { backgroundColor: "#14b8a6" }
      }
    },
    {
      id: "booking-timeline-2",
      group: "102",
      title: "WILLIAMS, Mrs Sarah - Do Not Move",
      start_time: checkInTime.getTime(),
      end_time: checkOut2Days.getTime(),
      canMove: false,
      canResize: false,
      itemProps: {
        style: { backgroundColor: "#22c55e" }
      }
    },
    {
      id: "booking-timeline-3",
      group: "201",
      title: "JOHNSON, Ms Emily",
      start_time: checkInTime.getTime(),
      end_time: checkOutTime.getTime(),
      canMove: true,
      canResize: true,
      itemProps: {
        style: { backgroundColor: "#bbf7d0" }
      }
    },
    {
      id: "booking-timeline-4",
      group: "206",
      title: "TAYLOR, Ms Amanda",
      start_time: checkInTime.getTime(),
      end_time: checkOutTime.getTime(),
      canMove: true,
      canResize: true,
      itemProps: {
        style: { backgroundColor: "#22c55e" }
      }
    }
  ]
}

// Mock timeline bookings with proper timestamps - now generated dynamically
export const MOCK_TIMELINE_BOOKINGS: Booking[] = generateTimelineBookings()

// Mock state objects for UI components
export const MOCK_MOVE_CONFIRMATION: MoveConfirmation = {
  isOpen: false,
  itemId: "",
  newStartTime: 0,
  newEndTime: 0,
  newGroupId: "",
  oldStartTime: 0,
  oldEndTime: 0,
  oldGroupId: ""
}

export const MOCK_NEW_BOOKING_FORM: NewBookingForm = {
  isOpen: false,
  roomId: "",
  startDate: "",
  endDate: "",
  guestName: ""
}

export const MOCK_DELETE_CONFIRMATION: DeleteConfirmation = {
  isOpen: false,
  bookingId: "",
  guestName: ""
} 