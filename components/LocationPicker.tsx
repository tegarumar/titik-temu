'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import L from 'leaflet'

// Dynamic import untuk Leaflet Map (client-only)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const useMapEvent = dynamic(() => import('react-leaflet').then(mod => mod.useMapEvent), { ssr: false })

interface LocationPickerProps {
  value?: string
  onChange?: (location: string, coordinates: { lat: number; lng: number }) => void
  placeholder?: string
}

// Map click handler component
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvent('click', (e) => {
    onMapClick(e.latlng.lat, e.latlng.lng)
  })
  return null
}

export function LocationPicker({ value, onChange, placeholder = 'Enter location name...' }: LocationPickerProps) {
  const [locationName, setLocationName] = useState(value || '')
  const [latitude, setLatitude] = useState<number>(-6.2088)  // Default Jakarta center
  const [longitude, setLongitude] = useState<number>(106.8456)
  const [showMap, setShowMap] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update parent when coordinates change
  useEffect(() => {
    if (locationName) {
      onChange?.(locationName, { lat: latitude, lng: longitude })
    }
  }, [locationName, latitude, longitude, onChange])

  const handleMapClick = (lat: number, lng: number) => {
    setLatitude(Number(lat.toFixed(4)))
    setLongitude(Number(lng.toFixed(4)))
  }

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setLatitude(value)
    }
  }

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setLongitude(value)
    }
  }

  return (
    <div ref={containerRef} className="w-full space-y-4 relative z-20">
      {/* Location Name Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <MapPin size={20} className="text-red-500 font-bold" />
        </div>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder={placeholder}
          className="w-full border-3 border-black p-3 pl-10 font-bold focus:outline-none focus:ring-2 focus:ring-black bg-white"
        />
      </div>

      {/* Interactive Map */}
      {showMap && (
        <div className="border-3 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-blue-300 border-b-3 border-black p-3 font-bold text-sm flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            Click on map to select location coordinates
          </div>

          {/* Leaflet Map Container */}
          <div className="w-full h-80 relative">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              scrollWheelZoom={true}
              className="w-full h-full"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]}>
              </Marker>
              <MapClickHandler onMapClick={handleMapClick} />
            </MapContainer>
          </div>

          {/* Coordinates Input Section */}
          <div className="border-t-3 border-black p-4 bg-yellow-100 space-y-3">
            <div className="text-xs font-bold text-gray-700 uppercase">Set coordinates</div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Latitude Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={handleLatitudeChange}
                  placeholder="Latitude"
                  className="border-3 border-black p-2 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                />
              </div>

              {/* Longitude Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={handleLongitudeChange}
                  placeholder="Longitude"
                  className="border-3 border-black p-2 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                />
              </div>
            </div>

            <div className="text-xs text-gray-600 font-bold pt-2 border-t-2 border-black">
              Current: {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
