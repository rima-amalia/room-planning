import RoomPlanHeader from "@/components/room-plan-header"
import MonthSelector from "@/components/month-selector"
import RoomCalendar from "@/components/room-calendar"
import UnassignedGuests from "@/components/unassigned-guests"
import Legend from "@/components/legend"

export default function RoomPlanPage() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-2 border-b">
        <RoomPlanHeader />
      </div>
      <div className="p-2 border-b">
        <MonthSelector />
      </div>
      <div className="flex-1 overflow-auto">
        <RoomCalendar />
      </div>
      <div className="border-t">
        <UnassignedGuests />
      </div>
      <div className="border-t p-1">
        <Legend />
      </div>
    </div>
  )
}
