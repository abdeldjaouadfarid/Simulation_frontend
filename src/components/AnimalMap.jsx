// components/AnimalMap.jsx

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix broken Leaflet marker icons with create-react-app
import iconUrl        from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl  from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl      from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })

// Create a green marker icon for safe animals
const greenIcon = new L.Icon({
  iconUrl:      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
})

// Create a red marker icon for animals outside the safe zone
const redIcon = new L.Icon({
  iconUrl:      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
})

// Create an orange marker icon for stolen animals (panic mode)
const orangeIcon = new L.Icon({
  iconUrl:      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
})

function AnimalMap({ animals, geofence }) {
  // Center the map on Central Park, NYC
  const mapCenter = [35.6650, 4.4300];

  // Convert the geofence GeoJSON coordinates into the [lat, lng] format that Leaflet expects.
  // GeoJSON stores coordinates as [longitude, latitude] but Leaflet needs [latitude, longitude].
  let geofencePositions = []
  if (geofence && geofence.zone && geofence.zone.coordinates) {
    geofencePositions = geofence.zone.coordinates[0].map(([lng, lat]) => [lat, lng])
  }

  // Pick the right icon based on the animal's status
  function getIcon(animal) {
    if (animal.status === 'stolen') return orangeIcon
    if (animal.status === 'alert')  return redIcon
    return greenIcon
  }

  return (
    <MapContainer center={mapCenter} zoom={14} style={{ height: '500px', width: '100%', borderRadius: '8px' }}>

      {/* The base map tiles from OpenStreetMap (free, no API key needed) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {/* Draw the safe zone polygon in green */}
      {geofencePositions.length > 0 && (
        <Polygon
          positions={geofencePositions}
          pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.15 }}
        />
      )}

      {/* Place a marker for each animal */}
      {animals.map((animal) => (
        <Marker
          key={animal.id}
          position={[animal.latitude, animal.longitude]}
          icon={getIcon(animal)}
        >
          {/* Clicking the marker shows a popup with animal info */}
          <Popup>
            <div className="text-sm">
              <p className="font-bold text-base">{animal.name}</p>
              <p>Status: <span className={
                animal.status === 'safe'   ? 'text-green-600' :
                animal.status === 'alert'  ? 'text-red-600'   :
                'text-orange-500'
              }>{animal.status}</span></p>
              <p>Lat: {parseFloat(animal.latitude).toFixed(5)}</p>
              <p>Lng: {parseFloat(animal.longitude).toFixed(5)}</p>
            </div>
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  )
}

export default AnimalMap