import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { Trip } from "../types";

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
}

export function TripCard({ trip, onClick }: TripCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getStatusColor = () => {
    switch (trip.status) {
      case "current":
        return "bg-green-100 text-green-700 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "past":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <button
      onClick={onClick}
      className="group w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
    >
      {/* Trip Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.imageUrl}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full border ${getStatusColor()} backdrop-blur-sm`}
          >
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>

        {/* Trip Name */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
            {trip.name}
          </h3>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-4">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 text-left font-medium">
            {trip.destination}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <p className="text-sm text-gray-600">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
        </div>

        {trip.description && (
          <p className="text-gray-500 line-clamp-2 text-left mb-3">
            {trip.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-semibold text-blue-600">
            View Details
          </span>
          <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </div>
      </div>
    </button>
  );
}
