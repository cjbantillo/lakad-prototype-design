import { useState } from "react";
import { MapPin, Info, Navigation } from "lucide-react";
import { Activity } from "../types";

interface MapViewProps {
  destination: string;
  locations: Activity[];
}

export function MapView({ destination, locations }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<Activity | null>(
    null
  );

  // Mock map coordinates based on destination
  // To enable maps: Get a Google Maps API key from https://console.cloud.google.com/
  // and replace YOUR_GOOGLE_MAPS_API_KEY below
  const getMapEmbedUrl = () => {
    const query = encodeURIComponent(destination);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${query}&zoom=12`;
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900">
            <strong>Map View:</strong> This is a preview of your trip locations.
            In a production app, this would show an interactive Google Maps with
            all your activity locations pinned.
          </p>
          <p className="text-blue-700 mt-2">
            To enable real maps, you would need to add a Google Maps API key.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Locations List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Trip Locations ({locations.length})
          </h3>

          {locations.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No locations added yet</p>
              <p className="text-gray-500 mt-2">
                Add activities to your itinerary to see them on the map
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full text-left bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md ${
                    selectedLocation?.id === location.id
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 mb-1">{location.name}</p>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="text-xs truncate">
                          {location.location}
                        </span>
                      </div>
                      {location.type && (
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs capitalize">
                          {location.type}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            {/* Map Header */}
            <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">{destination}</h3>
                </div>
              </div>
            </div>

            {/* Mock Map Area */}
            <div className="relative bg-gray-100 h-[500px] lg:h-[600px]">
              {/* This would be replaced with actual Google Maps embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Interactive Map</h3>
                  <p className="text-gray-600 max-w-md">
                    This area would display an interactive Google Maps showing
                    all your trip locations with pins and route information.
                  </p>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 max-w-md mx-auto">
                    <p className="text-gray-700 mb-2">
                      <strong>To enable maps:</strong>
                    </p>
                    <ol className="text-left text-gray-600 space-y-1">
                      <li>1. Get a Google Maps API key</li>
                      <li>2. Enable Maps Embed API</li>
                      <li>3. Add the key to your environment</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Sample Location Pins Overlay */}
              {locations.length > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {locations.slice(0, 5).map((location, index) => (
                    <div
                      key={location.id}
                      className="absolute"
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${30 + index * 10}%`,
                      }}
                    >
                      <div className="relative pointer-events-auto">
                        <button
                          onClick={() => setSelectedLocation(location)}
                          className="w-10 h-10 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-4 border-white"
                        >
                          <span className="text-white">{index + 1}</span>
                        </button>
                        {selectedLocation?.id === location.id && (
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 w-48 z-10">
                            <p className="text-gray-900 mb-1">
                              {location.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {location.location}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Location Info */}
            {selectedLocation && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">
                      {selectedLocation.name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {selectedLocation.location}
                    </p>
                    {selectedLocation.time && (
                      <p className="text-gray-500">
                        Scheduled: {selectedLocation.time}
                      </p>
                    )}
                    {selectedLocation.notes && (
                      <p className="text-gray-500 mt-2">
                        {selectedLocation.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
