import { ChevronDown, ChevronUp } from "lucide-react"

export default function UnassignedGuests() {
  const guests = [
    {
      lastName: "-",
      firstName: "Chandra",
      confirmationNumber: "52722526-1",
      roomType: "DBPK",
      building: "",
      ratePlan: "CORP",
      averageNightly: "5,000,000",
      departureDate: "04-08-2023",
      vipLevel: "",
      group: "",
      share: "",
      preferences: "",
      loyaltyNumber: "",
      loyaltyLevel: "",
      idNumber: "",
      gender: "",
    },
    {
      lastName: "-",
      firstName: "Chandra",
      confirmationNumber: "78726086-1",
      roomType: "DBPK",
      building: "",
      ratePlan: "CORP",
      averageNightly: "2,000,000",
      departureDate: "04-08-2023",
      vipLevel: "",
      group: "",
      share: "",
      preferences: "",
      loyaltyNumber: "",
      loyaltyLevel: "",
      idNumber: "",
      gender: "",
    },
    {
      lastName: "Budiman",
      firstName: "Henrry",
      confirmationNumber: "69312345-1",
      roomType: "DLXK",
      building: "",
      ratePlan: "MICE",
      averageNightly: "4,900,000",
      departureDate: "05-08-2023",
      vipLevel: "",
      group: "Pertamina Hulu Rokan",
      share: "",
      preferences: "",
      loyaltyNumber: "",
      loyaltyLevel: "",
      idNumber: "",
      gender: "",
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between p-1 bg-gray-100 border-b">
        <h2 className="text-sm font-medium">Unassigned Guests</h2>
        <button className="p-1 hover:bg-gray-200 rounded">
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Last Name
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  First Name
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Confirmation Number
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Room Type
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Building
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Rate Plan
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Average Nightly
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">
                <div className="flex items-center">
                  Departure Date
                  <button className="ml-1">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">VIP Level</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">Group</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">Share</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">Preferences</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">Loyalty Number</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">Loyalty Level</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">ID Number</th>
              <th className="border px-2 py-1 text-left text-xs font-medium text-gray-700">Gender</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-blue-50" : ""}>
                <td className="border px-2 py-1 text-xs">{guest.lastName}</td>
                <td className="border px-2 py-1 text-xs">{guest.firstName}</td>
                <td className="border px-2 py-1 text-xs">{guest.confirmationNumber}</td>
                <td className="border px-2 py-1 text-xs">{guest.roomType}</td>
                <td className="border px-2 py-1 text-xs">{guest.building}</td>
                <td className="border px-2 py-1 text-xs">{guest.ratePlan}</td>
                <td className="border px-2 py-1 text-xs text-right">{guest.averageNightly}</td>
                <td className="border px-2 py-1 text-xs">{guest.departureDate}</td>
                <td className="border px-2 py-1 text-xs">{guest.vipLevel}</td>
                <td className="border px-2 py-1 text-xs">{guest.group}</td>
                <td className="border px-2 py-1 text-xs">{guest.share}</td>
                <td className="border px-2 py-1 text-xs">{guest.preferences}</td>
                <td className="border px-2 py-1 text-xs">{guest.loyaltyNumber}</td>
                <td className="border px-2 py-1 text-xs">{guest.loyaltyLevel}</td>
                <td className="border px-2 py-1 text-xs">{guest.idNumber}</td>
                <td className="border px-2 py-1 text-xs">{guest.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-1 text-xs text-gray-600 flex items-center justify-between border-t">
        <div>Records: 11 of 11</div>
        <div className="flex items-center">
          <span>Show Filter Row:</span>
          <input type="checkbox" className="ml-1" />
        </div>
      </div>
    </div>
  )
}
