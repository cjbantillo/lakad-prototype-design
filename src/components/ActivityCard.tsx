import { useDrag, useDrop } from "react-dnd";
import {
  Clock,
  MapPin,
  Trash2,
  GripVertical,
  UtensilsCrossed,
  Bed,
  Plane,
  Landmark,
} from "lucide-react";
import { Activity } from "../types";

interface ActivityCardProps {
  activity: Activity;
  dayNumber: number;
  index: number;
  onMoveActivity: (
    activityId: string,
    sourceDayNumber: number,
    targetDayNumber: number,
    targetIndex: number
  ) => void;
  onDeleteActivity: (activityId: string, dayNumber: number) => void;
}

export function ActivityCard({
  activity,
  dayNumber,
  index,
  onMoveActivity,
  onDeleteActivity,
}: ActivityCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ACTIVITY",
    item: { id: activity.id, sourceDayNumber: dayNumber },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ACTIVITY",
    drop: (item: { id: string; sourceDayNumber: number }) => {
      if (item.id !== activity.id) {
        onMoveActivity(item.id, item.sourceDayNumber, dayNumber, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getActivityIcon = () => {
    switch (activity.type) {
      case "dining":
        return <UtensilsCrossed className="w-4 h-4 stroke-[2]" />;
      case "accommodation":
        return <Bed className="w-4 h-4 stroke-[2]" />;
      case "travel":
        return <Plane className="w-4 h-4 stroke-[2]" />;
      case "attraction":
        return <Landmark className="w-4 h-4 stroke-[2]" />;
      default:
        return <MapPin className="w-4 h-4 stroke-[2]" />;
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case "dining":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "accommodation":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "travel":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "attraction":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`group bg-white border rounded-lg p-3 cursor-move transition-all ${
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      } ${
        isOver
          ? "border-blue-400 shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div className="flex-shrink-0 pt-1">
          <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Activity Type Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs ${getActivityColor()}`}
            >
              {getActivityIcon()}
              <span className="capitalize">{activity.type}</span>
            </span>
            {activity.time && (
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{activity.time}</span>
              </div>
            )}
          </div>

          {/* Activity Name */}
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {activity.name}
          </p>

          {/* Location */}
          {activity.location && (
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs truncate">{activity.location}</span>
            </div>
          )}

          {/* Notes */}
          {activity.notes && (
            <p className="text-gray-500 text-xs mt-2">{activity.notes}</p>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDeleteActivity(activity.id, dayNumber)}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
