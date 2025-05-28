"use client";

import { useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import "./timeline-styles.css";
import moment from "moment";
import {
  Booking,
  CalendarDay,
  MOCK_OCCUPANCY_DATA,
  MOCK_LEGACY_ROOMS,
  MOCK_CALENDAR_DAYS,
  getMonthInfo,
} from "@/constants/mock-data";
import Tooltip from "./tooltip";

// Legacy interfaces for backward compatibility with timeline
interface Room {
  number: string;
  type: string;
  status: string;
  bookings: Booking[];
}

interface TimelineGroup {
  id: string;
  title: string;
  rightTitle?: string;
  stackItems?: boolean;
  height?: number;
  roomType?: string;
  roomStatus?: string;
}

interface TimelineItem {
  id: string;
  group: string;
  title: string;
  start_time: number;
  end_time: number;
  canMove?: boolean;
  canResize?: boolean | "both" | "left" | "right";
  canChangeGroup?: boolean;
  itemProps?: {
    className?: string;
    style?: React.CSSProperties;
    "data-custom-attribute"?: string;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: () => void;
  };
}

// New Booking Form Modal Component
interface NewBookingModalProps {
  isOpen: boolean;
  onConfirm: (guestName: string, hours: number) => void;
  onCancel: () => void;
  roomNumber: string;
  startDate: string;
}

const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  roomNumber,
  startDate,
}) => {
  const [guestName, setGuestName] = useState("");
  const [hours, setHours] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      onConfirm(guestName.trim(), hours);
      setGuestName("");
      setHours(1);
    }
  };

  const handleCancel = () => {
    setGuestName("");
    setHours(1);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-semibold mb-4">Add New Reservation</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room: {roomNumber}
            </label>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date: {moment(startDate).format("MMM DD, YYYY")}
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Name *
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guest name"
              required
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) =>
                setHours(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="24"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Room Type Tooltip Component
interface RoomTypeTooltipProps {
  isVisible: boolean;
  position: { x: number; y: number };
  roomType: string;
  roomStatus: string;
}

const RoomTypeTooltip: React.FC<RoomTypeTooltipProps> = ({
  isVisible,
  position,
  roomType,
  roomStatus,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[10000] bg-white shadow-lg rounded-lg p-3 text-sm"
      style={{
        left: position.x + 10,
        top: position.y + 10,
        minWidth: "200px",
      }}
    >
      <div className="font-medium mb-1">Room Information</div>
      <div className="text-gray-600">
        <div>Type: {roomType}</div>
        <div>Status: {roomStatus}</div>
      </div>
    </div>
  );
};

export default function RoomCalendar() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [month, setMonth] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<TimelineGroup[]>([]);
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [occupancyData, setOccupancyData] = useState(MOCK_OCCUPANCY_DATA);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingMove, setPendingMove] = useState<{
    itemId: string;
    dragTime: number;
    newGroupOrder: number;
  } | null>(null);

  // New booking modal state
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [newBookingData, setNewBookingData] = useState<{
    roomNumber: string;
    startTime: number;
  } | null>(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
    roomNumber: string;
    date: string;
    bookingData: Booking | null;
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
    roomNumber: "",
    date: "",
    bookingData: null,
  });

  // Room type tooltip state
  const [roomTypeTooltip, setRoomTypeTooltip] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
    roomType: string;
    roomStatus: string;
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
    roomType: "",
    roomStatus: "",
  });

  useEffect(() => {
    // Use hardcoded data instead of API calls
    const initializeData = () => {
      try {
        setLoading(true);

        // Use the imported mock data directly
        setRooms(MOCK_LEGACY_ROOMS);
        setDays(MOCK_CALENDAR_DAYS);

        // Set dynamic month display
        const monthInfo = getMonthInfo();
        setMonth(monthInfo.displayName);

        setOccupancyData(MOCK_OCCUPANCY_DATA);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Helper function to check if booking has "do not move" indicator
  const hasDoNotMoveIndicator = (booking: Booking): boolean => {
    return (
      booking.text?.includes("-") ||
      booking.text?.toLowerCase().includes("do not move") ||
      false
    );
  };

  // Helper function to check for conflicts
  const hasConflict = (
    itemId: string,
    startTime: number,
    endTime: number,
    groupId: string
  ): boolean => {
    return items.some(
      (item) =>
        item.id !== itemId &&
        item.group === groupId &&
        ((startTime >= item.start_time && startTime < item.end_time) ||
          (endTime > item.start_time && endTime <= item.end_time) ||
          (startTime <= item.start_time && endTime >= item.end_time))
    );
  };

  // Transform rooms and bookings data for timeline
  useEffect(() => {
    if (rooms.length === 0 || days.length === 0) return;

    // Create groups from rooms
    const timelineGroups: TimelineGroup[] = rooms.map((room) => ({
      id: room.number,
      title: `${room.number} (${room.type})`,
      rightTitle: getStatusText(room.status),
      stackItems: false,
      height: 50,
      roomType: room.type,
      roomStatus: room.status,
    }));

    // Create items from bookings
    const timelineItems: TimelineItem[] = [];

    rooms.forEach((room) => {
      room.bookings.forEach((booking) => {
        // Skip bookings without required properties
        if (!booking.start_time || !booking.end_time || !booking.text || !booking.color)
          return;

        const colorClass = booking.color.replace("bg-", "");
        const className = [
          "teal-500",
          "green-500",
          "green-200",
          "orange-400",
          "orange-300",
        ].includes(colorClass)
          ? `timeline-item-${colorClass.replace("-", "_")}`
          : "timeline-item-default";

        const isDoNotMove = hasDoNotMoveIndicator(booking);

        timelineItems.push({
          id: booking.id,
          group: room.number,
          title: `${booking.text}${
            booking.icons
              ? ` ${booking.icons.includes("heart") ? "❤️" : ""}${
                  booking.icons.includes("thumbsup") ? "👍" : ""
                }`
              : ""
          }${isDoNotMove ? " ➖" : ""}`,
          start_time: booking.start_time,
          end_time: booking.end_time,
          canMove: !isDoNotMove,
          canResize: !isDoNotMove ? "both" : false,
          canChangeGroup: !isDoNotMove,
          itemProps: {
            className: isDoNotMove ? `timeline-item-do-not-move` : className,
            style: {
              color: "white",
              borderRadius: "4px",
            },
            "data-custom-attribute": `${booking.id}|${
              room.number
            }|${moment(booking.start_time).format("YYYY-MM-DD")}`,
          },
        });
      });
    });

    setGroups(timelineGroups);
    setItems(timelineItems);
  }, [rooms, days]);

  // Add handlers for Timeline events
  const handleGroupMouseEnter = (groupId: string, e: React.MouseEvent) => {
    console.log('Group mouse enter:', groupId);
    const room = rooms.find(r => r.number === groupId);
    if (room) {
      setRoomTypeTooltip({
        isVisible: true,
        position: { x: e.clientX, y: e.clientY },
        roomType: room.type,
        roomStatus: room.status,
      });
    }
  };

  const handleGroupMouseLeave = () => {
    console.log('Group mouse leave');
    setRoomTypeTooltip(prev => ({ ...prev, isVisible: false }));
  };

  // Add DOM event listeners for tooltip
  useEffect(() => {
    const setupEventListeners = () => {
      const handleDocumentClick = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const target = mouseEvent.target as HTMLElement;
        
        // Check if click is on timeline items or tooltip
        const isTimelineItem = target.closest(".rct-item") || target.closest("[data-custom-attribute]");
        const isTooltip = target.closest(".fixed.z-\\[10000\\]") || target.closest("[class*='tooltip']");
        
        // Only hide tooltip if clicking outside both timeline items and tooltip
        if (!isTimelineItem && !isTooltip) {
          console.log('Document click outside timeline items, hiding tooltip');
          setTooltip((prev) => ({ ...prev, isVisible: false }));
        } else {
          console.log('Document click on timeline item or tooltip, keeping tooltip');
        }
      };

      // Add click listener to document to hide tooltip when clicking outside
      document.addEventListener("click", handleDocumentClick);

      // Return cleanup function
      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    };

    // Add a small delay to ensure DOM is rendered
    const timeoutId = setTimeout(setupEventListeners, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [items, rooms]); // Re-run when items or rooms change

  const getStatusText = (status: string): string => {
    switch (status) {
      case "clean":
        return "Clean";
      case "occupied":
        return "Occupied";
      case "smoking":
        return "Smoking";
      case "smoking-occupied":
        return "Smoking + Occupied";
      default:
        return "";
    }
  };

  const handleItemMove = (
    itemId: string,
    dragTime: number,
    newGroupOrder: number
  ) => {
    // Find the item being moved
    const movingItem = items.find((item) => item.id === itemId);
    if (!movingItem) return;

    // Check if item can be moved
    if (!movingItem.canMove) {
      return; // Prevent moving items marked as "do not move"
    }

    const duration = movingItem.end_time - movingItem.start_time;
    const newGroup = groups[newGroupOrder]?.id || movingItem.group;
    const newEndTime = dragTime + duration;

    // Check for conflicts
    if (hasConflict(itemId, dragTime, newEndTime, newGroup)) {
      alert(
        "Cannot move booking: There is already a booking in this time slot."
      );
      return;
    }

    // Store pending move and show confirmation modal
    setPendingMove({ itemId, dragTime, newGroupOrder });
    setShowConfirmModal(true);
  };

  const confirmMove = () => {
    if (!pendingMove) return;

    const { itemId, dragTime, newGroupOrder } = pendingMove;
    const movingItem = items.find((item) => item.id === itemId);
    if (!movingItem) return;

    const duration = movingItem.end_time - movingItem.start_time;
    const newGroup = groups[newGroupOrder]?.id || movingItem.group;

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          start_time: dragTime,
          end_time: dragTime + duration,
          group: newGroup,
        };
      }
      return item;
    });

    // Update items state directly without triggering rooms update
    setItems(updatedItems);

    // Update rooms data to keep them in sync
    const updatedRooms: Room[] = rooms.map((room) => ({
      ...room,
      bookings: room.bookings
        .map((booking) => {
          if (booking.id === itemId) {
            return {
              ...booking,
              start_time: dragTime,
              end_time: dragTime + duration,
            };
          }
          return booking;
        })
        .filter((booking) => booking.id !== itemId || booking.id === itemId), // Keep all bookings
    }));

    // If the booking moved to a different room, handle the transfer
    const oldRoom = rooms.find((room) =>
      room.bookings.some((b) => b.id === itemId)
    );
    const newRoom = rooms.find((room) => room.number === newGroup);

    if (oldRoom && newRoom && oldRoom.number !== newRoom.number) {
      // Remove from old room
      const oldRoomIndex = updatedRooms.findIndex(
        (r) => r.number === oldRoom.number
      );
      if (oldRoomIndex !== -1) {
        updatedRooms[oldRoomIndex].bookings = updatedRooms[
          oldRoomIndex
        ].bookings.filter((b) => b.id !== itemId);
      }

      // Add to new room
      const newRoomIndex = updatedRooms.findIndex(
        (r) => r.number === newRoom.number
      );
      if (newRoomIndex !== -1) {
        const originalBooking = oldRoom.bookings.find((b) => b.id === itemId);
        if (originalBooking) {
          updatedRooms[newRoomIndex].bookings.push({
            ...originalBooking,
            start_time: dragTime,
            end_time: dragTime + duration,
          });
        }
      }
    }

    setRooms(updatedRooms);
    setShowConfirmModal(false);
    setPendingMove(null);
  };

  const cancelMove = () => {
    setShowConfirmModal(false);
    setPendingMove(null);
  };

  const handleItemResize = (
    itemId: string,
    time: number,
    edge: "left" | "right"
  ) => {
    // Find the item being resized
    const resizingItem = items.find((item) => item.id === itemId);
    if (!resizingItem || !resizingItem.canResize) {
      return; // Prevent resizing items marked as "do not move"
    }

    const newStartTime = edge === "left" ? time : resizingItem.start_time;
    const newEndTime = edge === "right" ? time : resizingItem.end_time;

    // Check for conflicts
    if (hasConflict(itemId, newStartTime, newEndTime, resizingItem.group)) {
      alert("Cannot resize booking: This would conflict with another booking.");
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        if (edge === "left") {
          return { ...item, start_time: time };
        } else {
          return { ...item, end_time: time };
        }
      }
      return item;
    });

    // Update items state directly
    setItems(updatedItems);

    // Update rooms data to keep them in sync
    const updatedRooms: Room[] = rooms.map((room) => ({
      ...room,
      bookings: room.bookings.map((booking) => {
        if (booking.id === itemId) {
          return {
            ...booking,
            start_time: newStartTime,
            end_time: newEndTime
          };
        }
        return booking;
      }),
    }));

    setRooms(updatedRooms);
  };

  // Handle canvas click to add new booking
  const handleCanvasClick = (groupId: string, time: number) => {
    const clickedTime = moment(time);
    const monthInfo = getMonthInfo();

    // Only allow creating bookings within the current displayed month and not in the past
    const monthStart = moment(monthInfo.startDate);
    const monthEnd = moment(monthInfo.endDate);
    const today = moment().startOf("day");

    if (clickedTime.isBefore(today)) {
      alert("Cannot create reservations for past dates.");
      return;
    }

    if (clickedTime.isBefore(monthStart) || clickedTime.isAfter(monthEnd)) {
      alert("Cannot create reservations outside the displayed month.");
      return;
    }

    // Check if there's already a booking at this time slot
    const hasExistingBooking = items.some(
      (item) =>
        item.group === groupId &&
        time >= item.start_time &&
        time < item.end_time
    );

    if (hasExistingBooking) {
      return; // Don't open modal if clicking on an existing booking
    }

    // Set the new booking data and show modal
    setNewBookingData({
      roomNumber: groupId,
      startTime: time,
    });
    setShowNewBookingModal(true);
  };

  // Handle new booking confirmation
  const handleNewBookingConfirm = (guestName: string, hours: number) => {
    if (!newBookingData) return;

    const startTime = moment(newBookingData.startTime).startOf("hour");
    const endTime = startTime.clone().add(hours, "hours");

    // Check for conflicts with the new booking duration
    const hasConflictWithDuration = items.some(
      (item) =>
        item.group === newBookingData.roomNumber &&
        ((startTime.valueOf() >= item.start_time &&
          startTime.valueOf() < item.end_time) ||
          (endTime.valueOf() > item.start_time &&
            endTime.valueOf() <= item.end_time) ||
          (startTime.valueOf() <= item.start_time &&
            endTime.valueOf() >= item.end_time))
    );

    if (hasConflictWithDuration) {
      alert(
        "Cannot create reservation: There is already a booking that conflicts with the selected time."
      );
      return;
    }

    // Generate a new unique ID
    const newId = `booking-new-${Date.now()}`;

    // Create new timeline item
    const newTimelineItem: TimelineItem = {
      id: newId,
      group: newBookingData.roomNumber,
      title: guestName,
      start_time: startTime.valueOf(),
      end_time: endTime.valueOf(),
      canMove: true,
      canResize: true,
      canChangeGroup: true,
      itemProps: {
        className: "timeline-item-teal_500",
        style: {
          color: "white",
          borderRadius: "4px",
        },
        "data-custom-attribute": `${newId}|${
          newBookingData.roomNumber
        }|${startTime.format("YYYY-MM-DD")}`,
      },
    };

    // Update items state
    setItems((prevItems) => [...prevItems, newTimelineItem]);

    // Update rooms data
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.number === newBookingData.roomNumber) {
          return {
            ...room,
            bookings: [
              ...room.bookings,
              {
                id: newId,
                text: guestName,
                color: "bg-teal-500",
                start_time: startTime.valueOf(),
                end_time: endTime.valueOf(),
                canMove: true,
                canResize: true
              },
            ],
          };
        }
        return room;
      })
    );

    // Close modal and reset state
    setShowNewBookingModal(false);
    setNewBookingData(null);
  };

  // Handle new booking cancellation
  const handleNewBookingCancel = () => {
    setShowNewBookingModal(false);
    setNewBookingData(null);
  };

  // Handle item click for tooltip
  const handleItemClick = (itemId: string, e: React.SyntheticEvent) => {
    console.log('handleItemClick called with:', { itemId, e });
    
    // Prevent the event from bubbling to document click handler
    e.stopPropagation();
    
    // Find the item data
    const item = items.find((item) => item.id === itemId);
    if (!item) {
      console.log('Item not found:', itemId);
      return;
    }

    // Extract booking info from data attribute
    const dataAttr = item.itemProps?.["data-custom-attribute"];
    if (!dataAttr) {
      console.log('No data attribute found for item:', item);
      return;
    }

    console.log('Data attribute:', dataAttr);
    const [bookingId, roomNumber, date] = dataAttr.split("|");

    // Find the booking data
    const room = rooms.find((r) => r.number === roomNumber);
    const booking = room?.bookings.find((b) => b.id === bookingId);

    console.log('Found booking:', { booking, room, roomNumber, date });

    if (booking) {
      // Get mouse position from the event, with fallback values
      let clientX = 0;
      let clientY = 0;
      
      if (e.nativeEvent && 'clientX' in e.nativeEvent && 'clientY' in e.nativeEvent) {
        clientX = (e.nativeEvent as MouseEvent).clientX;
        clientY = (e.nativeEvent as MouseEvent).clientY;
      } else if ('clientX' in e && 'clientY' in e) {
        const mouseEvent = e as React.MouseEvent;
        clientX = mouseEvent.clientX;
        clientY = mouseEvent.clientY;
      } else {
        // Fallback to center of screen if no mouse position available
        clientX = window.innerWidth / 2;
        clientY = window.innerHeight / 2;
      }
      
      console.log('Mouse position:', { clientX, clientY });
      
      // Toggle tooltip visibility - if already visible for this booking, hide it
      setTooltip((prev) => {
        console.log('Previous tooltip state:', prev);
        
        if (prev.isVisible && prev.bookingData?.id === bookingId) {
          console.log('Hiding tooltip');
          return { ...prev, isVisible: false };
        }
        
        const newTooltip = {
          isVisible: true,
          position: { x: clientX, y: clientY },
          roomNumber,
          date,
          bookingData: booking,
        };
        
        console.log('Setting new tooltip:', newTooltip);
        return newTooltip;
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="text-sm text-gray-500">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (groups.length === 0 || items.length === 0) {
    return (
      <div className="text-center py-4">
        <div className="text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  // Calculate timeline bounds dynamically
  const monthInfo = getMonthInfo();
  const startTime = moment(monthInfo.startDate).valueOf();
  const endTime = moment(monthInfo.endDate).valueOf();

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center bg-gray-100 border-b py-2">
        {month || monthInfo.displayName}
      </div>

      <div style={{ height: "600px" }}>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={startTime}
          defaultTimeEnd={endTime}
          sidebarWidth={150}
          rightSidebarWidth={100}
          canMove={true}
          canResize="both"
          canChangeGroup={true}
          itemHeightRatio={0.75}
          lineHeight={50}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          dragSnap={60 * 60 * 1000}
          minResizeWidth={20}
          buffer={1}
          onCanvasClick={handleCanvasClick}
          onItemClick={handleItemClick}
          groupRenderer={({ group }) => (
            <div 
              className="rct-sidebar-row-content"
              data-group-id={group.id}
              onMouseEnter={(e) => handleGroupMouseEnter(group.id, e)}
              onMouseLeave={handleGroupMouseLeave}
            >
              {group.title}
            </div>
          )}
        />
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onConfirm={confirmMove}
          onCancel={cancelMove}
          title="Confirm Move"
          message="Are you sure you want to move this booking?"
        />
      )}

      {showNewBookingModal && (
        <NewBookingModal
          isOpen={showNewBookingModal}
          onConfirm={handleNewBookingConfirm}
          onCancel={handleNewBookingCancel}
          roomNumber={newBookingData?.roomNumber || ""}
          startDate={moment(newBookingData?.startTime).format("YYYY-MM-DD")}
        />
      )}

      {tooltip.isVisible && (
        <Tooltip
          isVisible={tooltip.isVisible}
          position={tooltip.position}
          roomNumber={tooltip.roomNumber}
          date={tooltip.date}
          occupancyData={occupancyData}
          bookingData={tooltip.bookingData}
        />
      )}

      {roomTypeTooltip.isVisible && (
        <RoomTypeTooltip
          isVisible={roomTypeTooltip.isVisible}
          position={roomTypeTooltip.position}
          roomType={roomTypeTooltip.roomType}
          roomStatus={roomTypeTooltip.roomStatus}
        />
      )}

      {/* Debug: Always visible test tooltip */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-[10001] text-xs">
        Tooltip Debug: {tooltip.isVisible ? 'VISIBLE' : 'HIDDEN'} | 
        Position: {tooltip.position.x}, {tooltip.position.y} |
        Room: {tooltip.roomNumber} |
        Booking: {tooltip.bookingData?.text || 'none'}
      </div>
    </div>
  );
}
