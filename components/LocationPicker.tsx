'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

interface LocationPickerProps {
  value?: string
  onChange?: (location: string, coordinates: { lat: number; lng: number }) => void
  placeholder?: string
}

const MapView = dynamic(
  async () => {
    const RL = await import('react-leaflet')
    const L = (await import('leaflet')).default

    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })

    const MapEvents = ({ onMapClick, center }: { onMapClick: (lat: number, lng: number) => void, center: [number, number] }) => {
      const map = RL.useMap()
      
      RL.useMapEvent('click', (e) => {
        onMapClick(e.latlng.lat, e.latlng.lng)
      })

      useEffect(() => {
        map.flyTo(center, map.getZoom())
      }, [center, map])

      return null
    }

    // Return komponen peta utama
    return function MapComponent({ 
      latitude, 
      longitude, 
      onMapClick 
    }: { 
      latitude: number, 
      longitude: number, 
      onMapClick: (lat: number, lng: number) => void 
    }) {
      return (
        <RL.MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full relative z-0"
        >
          <RL.TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RL.Marker position={[latitude, longitude]} />
          <MapEvents onMapClick={onMapClick} center={[latitude, longitude]} />
        </RL.MapContainer>
      )
    }
  },
  { 
    ssr: false, // Wajib false untuk Leaflet
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 font-bold">Memuat Peta...</div>
  }
)

export function LocationPicker({ value, onChange, placeholder = 'Enter location name...' }: LocationPickerProps) {
  const [locationName, setLocationName] = useState(value || '')
  const [latitude, setLatitude] = useState<number>(-6.2088)  // Default Jakarta
  const [longitude, setLongitude] = useState<number>(106.8456)
  const [showMap, setShowMap] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update parent saat koordinat/nama berubah
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
    const val = parseFloat(e.target.value)
    if (!isNaN(val)) setLatitude(val)
  }

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    if (!isNaN(val)) setLongitude(val)
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

          {/* Leaflet Map Wrapper */}
          <div className="w-full h-80 relative bg-gray-50 z-0">
            <MapView 
              latitude={latitude} 
              longitude={longitude} 
              onMapClick={handleMapClick} 
            />
          </div>

          {/* Coordinates Input Section */}
          <div className="border-t-3 border-black p-4 bg-yellow-100 space-y-3 relative z-10">
            <div className="text-xs font-bold text-gray-700 uppercase">Set coordinates</div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={handleLatitudeChange}
                  readOnly
                  className="border-3 border-black p-2 font-mono font-bold text-sm focus:outline-none bg-gray-200 cursor-default"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={handleLongitudeChange}
                  readOnly
                  className="border-3 border-black p-2 font-mono font-bold text-sm focus:outline-none bg-gray-200 cursor-default"
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