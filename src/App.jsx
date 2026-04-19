// App.jsx
// The main component. It:
//   - Fetches the list of animals and the geofence on first load
//   - Listens for real-time updates from the backend via useSocket
//   - Renders the map, table, form, and panic button

import { useState, useEffect } from 'react'

import useSocket       from './hooks/useSocket'
import { getAnimals, addAnimal, removeAnimal, activatePanic, deactivatePanic, getGeofence } from './api'

import AnimalMap    from './components/AnimalMap'
import AnimalTable  from './components/AnimalTable'
import AddAnimalForm from './components/AddAnimalForm'
import PanicButton  from './components/PanicButton'
import AlertBox     from './components/AlertBox'

function App() {
  // animals from the DB (used for the table — we load this once)
  const [dbAnimals, setDbAnimals] = useState([])

  // the geofence polygon (loaded once from the backend)
  const [geofence, setGeofence] = useState(null)

  // real-time animal positions coming from Socket.io
  const { animals: liveAnimals, alerts, isPanic } = useSocket()

  // Show live positions on the map if we have them, otherwise show DB data
  const displayAnimals = liveAnimals.length > 0 ? liveAnimals : dbAnimals

  // ── Load data when the app first opens ─────────────────────────────────────
  useEffect(() => {
    // Fetch all animals from the database
    getAnimals()
      .then((res) => setDbAnimals(res.data))
      .catch((err) => console.error('Could not load animals:', err))

    // Fetch the geofence safe zone
    getGeofence()
      .then((res) => setGeofence(res.data))
      .catch((err) => console.error('Could not load geofence:', err))
  }, [])

  // ── Add a new animal ────────────────────────────────────────────────────────
  const handleAddAnimal = async (formData) => {
    try {
      const res = await addAnimal(formData)
      // Add the new animal to the local list so the table updates immediately
      setDbAnimals((prev) => [...prev, res.data])
    } catch (err) {
      alert('Could not add animal: ' + err.message)
    }
  }

  // ── Delete an animal ────────────────────────────────────────────────────────
  const handleDeleteAnimal = async (id) => {
    try {
      await removeAnimal(id)
      // Remove the animal from the local list so the table updates immediately
      setDbAnimals((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      alert('Could not delete animal: ' + err.message)
    }
  }

  // ── Panic mode ──────────────────────────────────────────────────────────────
  const handleActivatePanic = async () => {
    try {
      await activatePanic()
    } catch (err) {
      alert('Could not activate panic: ' + err.message)
    }
  }

  const handleDeactivatePanic = async () => {
    try {
      await deactivatePanic()
    } catch (err) {
      alert('Could not deactivate panic: ' + err.message)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-green-700 text-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">🐾 Animal Tracking Simulator</h1>
        <p className="text-green-200 text-sm">Live positions update every 1.5 seconds</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Geofence breach alerts */}
        <AlertBox alerts={alerts} />

        {/* Panic button section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">🚔 Theft / Panic Mode</h2>
          <PanicButton
            isPanic={isPanic}
            onActivate={handleActivatePanic}
            onDeactivate={handleDeactivatePanic}
          />
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">🗺️ Live Map</h2>
          <AnimalMap animals={displayAnimals} geofence={geofence} />

          {/* Legend */}
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>🟢 Safe</span>
            <span>🔴 Outside zone</span>
            <span>🟠 Stolen</span>
            <span className="text-green-700">▭ Green polygon = safe zone</span>
          </div>
        </div>

        {/* Animal table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-1">🐘 Animals</h2>
          <AnimalTable
            animals={displayAnimals}
            onDelete={handleDeleteAnimal}
          />

          {/* Add animal form */}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Add New Animal</h3>
            <AddAnimalForm onAdd={handleAddAnimal} />
          </div>
        </div>

      </main>
    </div>
  )
}

export default App