import { useDrop } from "react-dnd";
import { Plus, Calendar } from "lucide-react";
import { Day, Activity } from "../types";
import { ActivityCard } from "./ActivityCard";

interface DayColumnProps {
  day: Day;
  onAddActivity: (dayNumber: number) => void;
  onMoveActivity: (
    activityId: string,
    sourceDayNumber: number,
    targetDayNumber: number,
    targetIndex: number
  ) => void;
  onDeleteActivity: (activityId: string, dayNumber: number) => void;
}

export function DayColumn({
  day,
  onAddActivity,
  onMoveActivity,
  onDeleteActivity,
}: DayColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ACTIVITY",
    drop: (item: { id: string; sourceDayNumber: number }, monitor) => {
      if (!monitor.didDrop()) {
        // Dropped at the end of the list
        onMoveActivity(
          item.id,
          item.sourceDayNumber,
          day.dayNumber,
          day.activities.length
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className={`bg-white rounded-xl border transition-all shadow-sm ${
        isOver ? "border-teal-400 bg-teal-50/30" : "border-gray-200"
      }`}
    >
      {/* Day Header */}
      <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            Day {day.dayNumber}
          </h3>
          <div className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm">
            <span className="text-sm font-semibold text-gray-600">
              {day.activities.length} activities
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{formatDate(day.date)}</span>
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4 space-y-3 min-h-[200px]">
        {day.activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-500 mb-1">
              No activities yet
            </p>
            <p className="text-xs text-gray-400">
              Add activities or drag them here
            </p>
          </div>
        ) : (
          day.activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              dayNumber={day.dayNumber}
              index={index}
              onMoveActivity={onMoveActivity}
              onDeleteActivity={onDeleteActivity}
            />
          ))
        )}
      </div>

      {/* Add Activity Button */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => onAddActivity(day.dayNumber)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Activity</span>
        </button>
      </div>
    </div>
  );
}
