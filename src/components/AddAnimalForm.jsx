// components/AddAnimalForm.jsx
// A simple form with 4 fields to add a new animal.
// When submitted it calls the onAdd function passed from the parent.

import { useState } from 'react'

function AddAnimalForm({ onAdd }) {
  // Store each form field in state
  const [name,      setName]      = useState('')
  const [species,   setSpecies]   = useState('')
  const [longitude, setLongitude] = useState('4.4300')
  const [latitude,  setLatitude]  = useState('35.6600')

  const handleSubmit = (e) => {
    e.preventDefault() // stop the page from reloading

    if (!name || !species) return

    // Pass the form data up to the parent (App.jsx)
    onAdd({ name, species, longitude, latitude })

    // Clear the name and species fields after submitting
    setName('')
    setSpecies('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end mt-4">

      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">Name</label>
        <input
          type="text"
          placeholder="e.g. Leo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-1.5 text-sm w-32"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">Species</label>
        <input
          type="text"
          placeholder="e.g. Lion"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="border rounded px-3 py-1.5 text-sm w-32"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">Longitude</label>
        <input
          type="number"
          step="0.0001"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border rounded px-3 py-1.5 text-sm w-32"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">Latitude</label>
        <input
          type="number"
          step="0.0001"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="border rounded px-3 py-1.5 text-sm w-32"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
      >
        + Add Animal
      </button>

    </form>
  )
}

export default AddAnimalForm