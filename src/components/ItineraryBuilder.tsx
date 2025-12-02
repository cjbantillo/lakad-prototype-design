import { useState } from "react";
import { Plus } from "lucide-react";
import { Trip, Day, Activity } from "../types";
import { DayColumn } from "./DayColumn";
import { AddActivityModal } from "./AddActivityModal";

interface ItineraryBuilderProps {
  trip: Trip;
  onUpdateDays: (days: Day[]) => void;
}

export function ItineraryBuilder({
  trip,
  onUpdateDays,
}: ItineraryBuilderProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleAddActivity = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    setShowAddModal(true);
  };

  const handleCreateActivity = (activity: Activity) => {
    if (selectedDay === null) return;

    const updatedDays = trip.days.map((day) => {
      if (day.dayNumber === selectedDay) {
        return {
          ...day,
          activities: [...day.activities, activity],
        };
      }
      return day;
    });

    onUpdateDays(updatedDays);
    setShowAddModal(false);
    setSelectedDay(null);
  };

  const handleMoveActivity = (
    activityId: string,
    sourceDayNumber: number,
    targetDayNumber: number,
    targetIndex: number
  ) => {
    let activityToMove: Activity | null = null;

    // Remove activity from source
    const daysAfterRemoval = trip.days.map((day) => {
      if (day.dayNumber === sourceDayNumber) {
        const activity = day.activities.find((a) => a.id === activityId);
        if (activity) {
          activityToMove = activity;
        }
        return {
          ...day,
          activities: day.activities.filter((a) => a.id !== activityId),
        };
      }
      return day;
    });

    if (!activityToMove) return;

    // Add activity to target
    const updatedDays = daysAfterRemoval.map((day) => {
      if (day.dayNumber === targetDayNumber) {
        const newActivities = [...day.activities];
        newActivities.splice(targetIndex, 0, activityToMove as Activity);
        return {
          ...day,
          activities: newActivities,
        };
      }
      return day;
    });

    onUpdateDays(updatedDays);
  };

  const handleDeleteActivity = (activityId: string, dayNumber: number) => {
    const updatedDays = trip.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.filter((a) => a.id !== activityId),
        };
      }
      return day;
    });

    onUpdateDays(updatedDays);
  };

  return (
    <div>
      {/* Trip Description */}
      {trip.description && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <p className="text-gray-600">{trip.description}</p>
        </div>
      )}

      {/* Instruction Card */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3.5 mb-6 flex items-start gap-3">
        <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <p className="text-sm text-cyan-900">
          <strong className="font-semibold">Tip:</strong> Drag and drop
          activities between days to rearrange your itinerary
        </p>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trip.days.map((day) => (
          <DayColumn
            key={day.dayNumber}
            day={day}
            onAddActivity={handleAddActivity}
            onMoveActivity={handleMoveActivity}
            onDeleteActivity={handleDeleteActivity}
          />
        ))}
      </div>

      {/* Add Activity Modal */}
      {showAddModal && selectedDay !== null && (
        <AddActivityModal
          onClose={() => {
            setShowAddModal(false);
            setSelectedDay(null);
          }}
          onAddActivity={handleCreateActivity}
        />
      )}
    </div>
  );
}
