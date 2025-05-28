# Mock Data Constants

This directory contains all the mock data and interfaces used throughout the application. The data has been moved from hardcoded values in individual files to centralized constants for better maintainability.

## Interfaces

### Core Entities

- **`Room`**: Represents a hotel room with proper relationships to RoomType and Property
- **`RoomType`**: Defines room type information (GLSK, DBPK, DLXK, etc.)
- **`Property`**: Represents hotel property information
- **`RoomOccupancy`**: Room occupancy status information
- **`OccupancyData`**: Daily occupancy data for all rooms

### Legacy Interfaces (for backward compatibility)

- **`LegacyRoom`**: Original room interface used by the timeline component
- **`Booking`**: Booking information for timeline display
- **`CalendarDay`**: Calendar day information

## Mock Data Constants

### Properties
- `MOCK_PROPERTIES`: Array of hotel properties

### Room Types
- `MOCK_ROOM_TYPES`: Array of room type definitions
  - GLSK: Guest Single King
  - DBPK: Double King  
  - DLXK: Deluxe King

### Rooms
- `MOCK_ROOMS`: Array of rooms with proper relationships
- `MOCK_LEGACY_ROOMS`: Legacy format for backward compatibility

### Bookings & Calendar
- `MOCK_BOOKINGS`: Booking data organized by room number
- `MOCK_CALENDAR_DAYS`: Calendar day information for August 2023

### Occupancy
- `MOCK_OCCUPANCY_DATA`: Daily occupancy status for all rooms

## API Endpoints

### Legacy Endpoints (backward compatibility)
- `GET /api/rooms` - Returns legacy room format
- `GET /api/calendar` - Returns calendar data

### New Endpoints
- `GET /api/rooms-new` - Returns new Room interface format
- `GET /api/room-types` - Returns room type data
- `GET /api/properties` - Returns property data
- `GET /api/occupancy` - Returns occupancy data (supports date filtering)

## Usage Examples

### Importing Interfaces
```typescript
import { Room, RoomType, Property, OccupancyData } from '@/constants/mock-data'
```

### Importing Mock Data
```typescript
import { MOCK_ROOMS, MOCK_ROOM_TYPES, MOCK_PROPERTIES } from '@/constants/mock-data'
```

### Using in Components
```typescript
// For new components using the updated interfaces
const [rooms, setRooms] = useState<Room[]>([])

// For legacy components (like timeline)
const [legacyRooms, setLegacyRooms] = useState<LegacyRoom[]>([])
```

### API Usage
```typescript
// Fetch new room format
const response = await fetch('/api/rooms-new')
const { data: rooms } = await response.json() // Room[]

// Fetch occupancy for specific date
const response = await fetch('/api/occupancy?date=2023-08-03')
const { data: occupancy } = await response.json() // OccupancyData
```

## Migration Notes

- The original `Room` interface has been renamed to `LegacyRoom` for backward compatibility
- The new `Room` interface follows proper database relationships with IDs
- All mock data is now centralized and can be easily modified
- APIs support both legacy and new formats during transition period

## Future Improvements

1. Replace mock data with actual database connections
2. Add validation schemas for all interfaces
3. Implement proper error handling and data validation
4. Add support for multiple properties and date ranges
5. Migrate all components to use the new interface structure 