export default function MonthSelector() {
  const months = [
    { name: "DEC-2024", active: false },
    { name: "JAN-2025", active: false },
    { name: "FEB-2025", active: false },
    { name: "MAR-2025", active: false },
    { name: "APR-2025", active: false },
    { name: "MAY-2025", active: false },
    { name: "JUN-2025", active: true },
    { name: "JUL-2025", active: false },
    { name: "AUG-2025", active: false },
    { name: "SEP-2025", active: false },
    { name: "OCT-2025", active: false },
    { name: "NOV-2025", active: false },
  ]

  return (
    <div className="flex items-center space-x-1 overflow-x-auto pb-1">
      {months.map((month) => (
        <button
          key={month.name}
          className={`px-2 py-1 text-xs rounded ${
            month.active ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {month.name}
        </button>
      ))}
    </div>
  )
}
