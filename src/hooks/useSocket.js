// hooks/useSocket.js
// This custom hook connects to the backend Socket.io server.
// It listens for animal location updates and geofence alerts.
// Any component that needs real-time data can use this hook.

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const BACKEND_URL = 'http://localhost:3001'

// We create the socket connection once outside the hook
// so it doesn't reconnect every time a component re-renders
const socket = io(BACKEND_URL)

function useSocket() {
  const [animals, setAnimals]   = useState([])
  const [alerts, setAlerts]     = useState([])
  const [isPanic, setIsPanic]   = useState(false)

  useEffect(() => {
    // When the server sends new animal positions, update state
    socket.on('LOCATION_UPDATE', (updatedAnimals) => {
      setAnimals(updatedAnimals)
    })

    // When an animal leaves the safe zone, add an alert message
    socket.on('GEOFENCE_ALERT', (data) => {
      setAlerts((prev) => [data.message, ...prev].slice(0, 5)) // keep last 5 alerts
    })

    // When panic mode is turned on
    socket.on('PANIC_ACTIVATED', () => {
      setIsPanic(true)
    })

    // When panic mode is turned off
    socket.on('PANIC_DEACTIVATED', () => {
      setIsPanic(false)
      setAlerts([])
    })

    // Cleanup: remove listeners when the component unmounts
    return () => {
      socket.off('LOCATION_UPDATE')
      socket.off('GEOFENCE_ALERT')
      socket.off('PANIC_ACTIVATED')
      socket.off('PANIC_DEACTIVATED')
    }
  }, [])

  return { animals, alerts, isPanic }
}

export default useSocket