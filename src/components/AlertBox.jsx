// components/AlertBox.jsx
// Shows a list of geofence alert messages at the top of the page.
// Alerts appear when an animal leaves the safe zone.

function AlertBox({ alerts }) {
  // If there are no alerts, don't render anything
  if (alerts.length === 0) return null

  return (
    <div className="mb-4">
      {alerts.map((message, index) => (
        <div
          key={index}
          className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded mb-2 font-medium"
        >
          ⚠️ {message}
        </div>
      ))}
    </div>
  )
}

export default AlertBox