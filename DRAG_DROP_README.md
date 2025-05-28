# Room Calendar Drag & Drop Functionality

## Overview
The room calendar now supports drag and drop functionality, allowing users to move bookings between different rooms and dates seamlessly.

## Features

### ✨ Drag and Drop Bookings
- **Drag**: Click and hold any booking to start dragging
- **Drop**: Drop the booking on any available cell (room + date combination)
- **Visual Feedback**: 
  - Dragged items show with reduced opacity
  - Drop zones highlight in blue when hovering
  - Smooth animations during drag operations

### 🎯 Smart Interactions
- **Activation Distance**: Requires 8px movement to prevent accidental drags
- **Same Location Prevention**: Dropping on the same location won't trigger unnecessary updates
- **Real-time Updates**: Calendar state updates immediately after successful drops

## Technical Implementation

### Libraries Used
- `@dnd-kit/core` - Core drag and drop functionality
- `@dnd-kit/utilities` - Utility functions for drag and drop

### Key Components
- **DraggableBooking**: Makes individual bookings draggable
- **DroppableCell**: Makes calendar cells accept drops
- **DragOverlay**: Provides visual feedback during drag operations

### Data Structure
Each booking now includes a unique `id` field for tracking during drag operations:

```typescript
interface Booking {
  id: string        // Unique identifier for drag/drop
  day: number       // Day of the month
  text: string      // Booking description
  color: string     // Background color class
  length: number    // Duration in days
  icons?: string[]  // Optional icons (thumbsup, heart)
}
```

## Usage Instructions

1. **Start Dragging**: Click and hold any booking block
2. **Move**: Drag the booking to the desired room and date
3. **Drop**: Release to place the booking in the new location
4. **Cancel**: Drag outside the calendar area and release to cancel

## Browser Compatibility
- Modern browsers with pointer events support
- Touch devices supported for mobile drag and drop
- Keyboard accessibility maintained

## Future Enhancements
- Multi-select drag and drop
- Booking conflict detection
- Undo/redo functionality
- Drag and drop between different calendar views 