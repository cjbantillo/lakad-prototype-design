import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  List,
  Map as MapIcon,
} from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Trip, Day, Activity } from "../types";
import { ItineraryBuilder } from "./ItineraryBuilder";
import { MapView } from "./MapView";

interface TripManagementProps {
  trips: Trip[];
  onUpdateTrip: (trip: Trip) => void;
}

export function TripManagement({ trips, onUpdateTrip }: TripManagementProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [view, setView] = useState<"itinerary" | "map">("itinerary");

  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Trip not found</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleUpdateDays = (updatedDays: Day[]) => {
    const updatedTrip = { ...trip, days: updatedDays };
    onUpdateTrip(updatedTrip);
  };

  const getAllLocations = (): Activity[] => {
    const allActivities: Activity[] = [];
    trip.days.forEach((day) => {
      day.activities.forEach((activity) => {
        if (activity.location) {
          allActivities.push(activity);
        }
      });
    });
    return allActivities;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {trip.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("itinerary")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
                  view === "itinerary"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="w-5 h-5 stroke-[2.5]" />
                <span>Itinerary</span>
              </button>
              <button
                onClick={() => setView("map")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
                  view === "map"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <MapIcon className="w-5 h-5 stroke-[2.5]" />
                <span>Map View</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {view === "itinerary" ? (
            <ItineraryBuilder trip={trip} onUpdateDays={handleUpdateDays} />
          ) : (
            <MapView
              destination={trip.destination}
              locations={getAllLocations()}
            />
          )}
        </main>
      </div>
    </DndProvider>
  );
}
