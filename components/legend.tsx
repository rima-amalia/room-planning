import { ArrowDown, ArrowRight, Check, Heart, Home, Layers, Minus, Pencil, ThumbsUp, User, Users } from "lucide-react"

export default function Legend() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Legend</h3>
        <button className="p-1 hover:bg-gray-200 rounded">
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs p-1">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span>In House</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-orange-400"></div>
          <span>Reserved</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-pink-500"></div>
          <span>Pre-registered</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-300"></div>
          <span>Out Of Order</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-teal-500"></div>
          <span>Room Hold</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-purple-400"></div>
          <span>Lease</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-800"></div>
          <span>Not In Inventory</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-300"></div>
          <span>Smoking</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Check className="h-3 w-3 text-blue-500" />
          </div>
          <span>Accessible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span>Clean</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Pencil className="h-3 w-3 text-orange-500" />
          </div>
          <span>Dirty</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Check className="h-3 w-3 text-blue-500" />
          </div>
          <span>Inspect</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <ArrowDown className="h-3 w-3 text-blue-500" />
          </div>
          <span>Pickup</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Home className="h-3 w-3 text-blue-500" />
          </div>
          <span>Turn Down</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <User className="h-3 w-3 text-orange-500" />
          </div>
          <span>Attendant in Room</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs p-1">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Minus className="h-3 w-3" />
          </div>
          <span>Do Not Move</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <ThumbsUp className="h-3 w-3" />
          </div>
          <span>VIP</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Heart className="h-3 w-3" />
          </div>
          <span>Loyalty Member</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Users className="h-3 w-3" />
          </div>
          <span>Share</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <ArrowRight className="h-3 w-3" />
          </div>
          <span>Indirect</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Check className="h-3 w-3" />
          </div>
          <span>Day Use</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Layers className="h-3 w-3" />
          </div>
          <span>Lease</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4">
            <Home className="h-3 w-3" />
          </div>
          <span>Component Room</span>
        </div>
      </div>
    </div>
  )
}
