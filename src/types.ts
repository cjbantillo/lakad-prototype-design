export interface Activity {
  id: string;
  name: string;
  time: string;
  location: string;
  type: 'attraction' | 'dining' | 'accommodation' | 'travel' | 'other';
  notes?: string;
  lat?: number;
  lng?: number;
}

export interface Day {
  dayNumber: number;
  date: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'current' | 'upcoming' | 'past';
  description: string;
  imageUrl: string;
  days: Day[];
}
