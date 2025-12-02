import { useState } from "react";
import { Plus, MapPin, Calendar, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Trip } from "../types";
import { TripCard } from "./TripCard";
import { CreateTripModal } from "./CreateTripModal";

interface DashboardProps {
  trips: Trip[];
  onAddTrip: (trip: Trip) => void;
  isAuthenticated: boolean;
}

export function Dashboard({
  trips,
  onAddTrip,
  isAuthenticated,
}: DashboardProps) {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const currentTrips = trips.filter((trip) => trip.status === "current");
  const upcomingTrips = trips.filter((trip) => trip.status === "upcoming");
  const pastTrips = trips.filter((trip) => trip.status === "past");

  const handleTripClick = (tripId: string) => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Lak ad Chronicles
                </h1>
                <p className="text-sm text-gray-500">Your travel companion</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Guest</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Trip CTA */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span className="text-base">Create New Trip</span>
          </button>
        </div>

        {/* Current Trips */}
        {currentTrips.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-gray-900">Current Trip</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onClick={() => handleTripClick(trip.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">
                Upcoming Trips
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onClick={() => handleTripClick(trip.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past Trips */}
        {pastTrips.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Past Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onClick={() => handleTripClick(trip.id)}
                />
              ))}
            </div>
          </section>
        )}

        {trips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No trips yet
            </h3>
            <p className="text-base text-gray-600 mb-6">
              Start planning your next adventure!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-6 py-3 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Create Your First Trip</span>
            </button>
          </div>
        )}
      </main>

      {/* Create Trip Modal */}
      {showCreateModal && (
        <CreateTripModal
          onClose={() => setShowCreateModal(false)}
          onCreateTrip={onAddTrip}
        />
      )}
    </div>
  );
}
