import {
  ArrowLeft,
  Copy,
  FileText,
  HelpCircle,
  LayoutGrid,
  Printer,
  Redo,
  Save,
  Search,
  Settings,
  Undo,
} from "lucide-react"

export default function RoomPlanHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <h1 className="text-lg font-medium text-blue-600">Room Plan</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="border-r h-6" />
        <button className="p-1 hover:bg-gray-100 rounded">
          <FileText className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Save className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Printer className="h-4 w-4" />
        </button>
        <div className="border-r h-6" />
        <button className="p-1 hover:bg-gray-100 rounded">
          <Undo className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Redo className="h-4 w-4" />
        </button>
        <div className="border-r h-6" />
        <button className="p-1 hover:bg-gray-100 rounded">
          <Search className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Copy className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <HelpCircle className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <LayoutGrid className="h-4 w-4" />
        </button>
        <div className="border-r h-6" />
        <button className="p-1 hover:bg-gray-100 rounded">
          <Settings className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium">Search Criteria</span>
      </div>
    </div>
  )
}
