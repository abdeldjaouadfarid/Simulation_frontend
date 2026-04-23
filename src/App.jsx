import { useState, useEffect } from 'react'

// استيراد الأيقونات المطلوبة
import { 
  Dog, 
  ShieldAlert, 
  Map as MapIcon, 
  Database, 
  Activity,
  Circle
} from 'lucide-react'

import useSocket from './hooks/useSocket'
import { getAnimals, addAnimal, removeAnimal, activatePanic, deactivatePanic, getGeofence } from './api'

import AnimalMap from './components/AnimalMap'
import AnimalTable from './components/AnimalTable'
import AddAnimalForm from './components/AddAnimalForm'
import PanicButton from './components/PanicButton'
import AlertBox from './components/AlertBox'

function App() {
  const [dbAnimals, setDbAnimals] = useState([])
  const [geofence, setGeofence] = useState(null)
  const { animals: liveAnimals, alerts, isPanic } = useSocket()

  const displayAnimals = liveAnimals.length > 0 ? liveAnimals : dbAnimals

  useEffect(() => {
    getAnimals()
      .then((res) => setDbAnimals(res.data))
      .catch((err) => console.error('Could not load animals:', err))

    getGeofence()
      .then((res) => setGeofence(res.data))
      .catch((err) => console.error('Could not load geofence:', err))
  }, [])

  const handleAddAnimal = async (formData) => {
    try {
      const res = await addAnimal(formData)
      setDbAnimals((prev) => [...prev, res.data])
    } catch (err) {
      alert('Could not add animal: ' + err.message)
    }
  }

  const handleDeleteAnimal = async (id) => {
    try {
      await removeAnimal(id)
      setDbAnimals((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      alert('Could not delete animal: ' + err.message)
    }
  }

  const handleActivatePanic = async () => {
    try { await activatePanic() } catch (err) { alert('Could not activate panic: ' + err.message) }
  }

  const handleDeactivatePanic = async () => {
    try { await deactivatePanic() } catch (err) { alert('Could not deactivate panic: ' + err.message) }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-green-700 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Dog size={32} className="text-green-200" />
          <div>
            <h1 className="text-2xl font-bold">Animal Tracking Simulator</h1>
            <div className="flex items-center gap-2 text-green-200 text-sm">
              <Activity size={14} className="animate-pulse" />
              <span>Live positions update every 1.5 seconds</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Geofence breach alerts */}
        <AlertBox alerts={alerts} />

        {/* Panic button section */}
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-red-500">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <ShieldAlert size={20} />
            <h2 className="text-lg font-semibold">Theft / Panic Mode</h2>
          </div>
          <PanicButton
            isPanic={isPanic}
            onActivate={handleActivatePanic}
            onDeactivate={handleDeactivatePanic}
          />
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-800">
            <MapIcon size={20} />
            <h2 className="text-lg font-semibold">Live Map</h2>
          </div>
          <AnimalMap animals={displayAnimals} geofence={geofence} />

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Circle size={12} fill="#22c55e" className="text-green-500" /> Safe
            </span>
            <span className="flex items-center gap-1">
              <Circle size={12} fill="#ef4444" className="text-red-500" /> Outside zone
            </span>
            <span className="flex items-center gap-1">
              <Circle size={12} fill="#f97316" className="text-orange-500" /> Stolen
            </span>
            <span className="text-green-700 border border-green-200 px-2 py-0.5 rounded bg-green-50">
              Green polygon = safe zone
            </span>
          </div>
        </div>

        {/* Animal table */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-3 text-gray-800">
            <Database size={20} />
            <h2 className="text-lg font-semibold">Animals Inventory</h2>
          </div>
          <AnimalTable
            animals={displayAnimals}
            onDelete={handleDeleteAnimal}
          />

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Register New Animal</h3>
            <AddAnimalForm onAdd={handleAddAnimal} />
          </div>
        </div>

      </main>
    </div>
  )
}

export default App