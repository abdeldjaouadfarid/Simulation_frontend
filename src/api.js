// api.js
// All HTTP requests to the backend live here.
// We use axios to make the requests simpler to write.

import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

// Get all animals from the database
export function getAnimals() {
  return axios.get(`${BASE_URL}/animals`)
}

// Add a new animal
export function addAnimal(animalData) {
  return axios.post(`${BASE_URL}/animals`, animalData)
}

// Delete an animal by id
export function removeAnimal(id) {
  return axios.delete(`${BASE_URL}/animals/${id}`)
}

// Turn on panic / theft mode
export function activatePanic() {
  return axios.post(`${BASE_URL}/animals/panic`)
}

// Turn off panic mode
export function deactivatePanic() {
  return axios.post(`${BASE_URL}/animals/calm`)
}

// Get the geofence safe zone
export function getGeofence() {
  return axios.get(`${BASE_URL}/geofence`)
}