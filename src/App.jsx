import { useState, useEffect } from 'react'

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
  <div className="min-h-screen scanline" style={{ background: 'var(--bg)' }}>

    {/* Header */}
    <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      className="px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div style={{ background: 'var(--accent)', borderRadius: 2 }} className="p-2">
          <Dog size={22} color="#0d0f12" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 900, letterSpacing: '0.05em', color: '#fff', fontSize: '1.1rem' }}>
            ANIMAL TRACKING SYSTEM
          </h1>
          <div className="flex items-center gap-2" style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
            <Activity size={11} className="animate-pulse" style={{ color: 'var(--safe)' }} />
            LIVE · UPDATE INTERVAL 1500ms
          </div>
        </div>
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'right' }}>
        <div style={{ color: isPanic ? 'var(--danger)' : 'var(--safe)', fontWeight: 700 }}>
          {isPanic ? '⬤ PANIC ACTIVE' : '⬤ NOMINAL'}
        </div>
        <div>{displayAnimals.length} UNITS TRACKED</div>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">

      <AlertBox alerts={alerts} />

      {/* Panic strip */}
      <div style={{ background: 'var(--surface)', border: `1px solid ${isPanic ? 'var(--danger)' : 'var(--border)'}`, borderRadius: 4 }}
        className="px-5 py-4 flex items-center justify-between">
        <div>
          <div style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.7rem', color: 'var(--muted)' }}>
            EMERGENCY PROTOCOL
          </div>
          <div style={{ fontWeight: 600, color: isPanic ? 'var(--danger)' : 'var(--text)', fontSize: '1rem' }}>
            Theft / Panic Mode
          </div>
        </div>
        <PanicButton isPanic={isPanic} onActivate={handleActivatePanic} onDeactivate={handleDeactivatePanic} />
      </div>

      {/* Map */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4 }} className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.7rem', color: 'var(--muted)' }}>LIVE MAP</div>
          <div className="flex gap-4" style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
            <span style={{ color: 'var(--safe)' }}>⬤ SAFE</span>
            <span style={{ color: 'var(--danger)' }}>⬤ BREACH</span>
            <span style={{ color: 'var(--accent)' }}>⬤ STOLEN</span>
          </div>
        </div>
        <AnimalMap animals={displayAnimals} geofence={geofence} />
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4 }} className="p-4">
        <div style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.7rem', color: 'var(--muted)' }} className="mb-4">
          UNIT REGISTRY
        </div>
        <AnimalTable animals={displayAnimals} onDelete={handleDeleteAnimal} />
        <div style={{ borderTop: '1px solid var(--border)' }} className="mt-6 pt-5">
          <div style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.7rem', color: 'var(--muted)' }} className="mb-3">
            REGISTER NEW UNIT
          </div>
          <AddAnimalForm onAdd={handleAddAnimal} />
        </div>
      </div>

    </main>
  </div>
)
}

export default App