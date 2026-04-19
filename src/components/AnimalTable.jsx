// components/AnimalTable.jsx
// Shows all animals in a simple table.
// Each row has a delete button to remove that animal.

function AnimalTable({ animals, onDelete }) {
  if (animals.length === 0) {
    return <p className="text-gray-500 text-sm mt-2">No animals yet. Add one below!</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Species</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Latitude</th>
            <th className="px-4 py-2 border">Longitude</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{animal.id}</td>
              <td className="px-4 py-2 border font-medium">{animal.name}</td>
              <td className="px-4 py-2 border">{animal.species}</td>

              {/* Color the status text based on value */}
              <td className="px-4 py-2 border">
                <span className={`font-semibold ${
                  animal.status === 'safe'   ? 'text-green-600' :
                  animal.status === 'alert'  ? 'text-red-600'   :
                  'text-orange-500'
                }`}>
                  {animal.status}
                </span>
              </td>

              <td className="px-4 py-2 border">{parseFloat(animal.latitude).toFixed(5)}</td>
              <td className="px-4 py-2 border">{parseFloat(animal.longitude).toFixed(5)}</td>

              <td className="px-4 py-2 border">
                <button
                  onClick={() => onDelete(animal.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AnimalTable