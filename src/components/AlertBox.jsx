// components/AlertBox.jsx
// Shows a list of geofence alert messages at the top of the page.
// Alerts appear when an animal leaves the safe zone.
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React from 'react';

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
        <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
        {message}
        </div>
      ))}
    </div>
  )
}

export default AlertBox

