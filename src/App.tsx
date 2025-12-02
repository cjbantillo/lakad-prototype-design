import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TripManagement } from './components/TripManagement';
import { LoginSignup } from './components/LoginSignup';
import { Trip } from './types';

// Mock data for demonstration
const initialTrips: Trip[] = [
  {
    id: '1',
    name: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    status: 'upcoming',
    description: 'Exploring the vibrant culture and cuisine of Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    days: [
      {
        dayNumber: 1,
        date: '2024-03-15',
        activities: [
          { id: 'a1', name: 'Arrive at Narita Airport', time: '14:00', location: 'Narita Airport', type: 'travel' },
          { id: 'a2', name: 'Check-in at Hotel', time: '17:00', location: 'Shibuya Hotel', type: 'accommodation' },
          { id: 'a3', name: 'Explore Shibuya Crossing', time: '19:00', location: 'Shibuya Crossing', type: 'attraction' }
        ]
      },
      {
        dayNumber: 2,
        date: '2024-03-16',
        activities: [
          { id: 'a4', name: 'Visit Senso-ji Temple', time: '09:00', location: 'Asakusa', type: 'attraction' },
          { id: 'a5', name: 'Lunch at Tsukiji Market', time: '12:00', location: 'Tsukiji', type: 'dining' },
          { id: 'a6', name: 'Tokyo Skytree', time: '15:00', location: 'Sumida', type: 'attraction' }
        ]
      },
      {
        dayNumber: 3,
        date: '2024-03-17',
        activities: []
      }
    ]
  },
  {
    id: '2',
    name: 'Paris Getaway',
    destination: 'Paris, France',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    status: 'current',
    description: 'Romantic escape to the City of Light',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    days: [
      {
        dayNumber: 1,
        date: '2024-02-01',
        activities: [
          { id: 'b1', name: 'Eiffel Tower Visit', time: '10:00', location: 'Champ de Mars', type: 'attraction' },
          { id: 'b2', name: 'Seine River Cruise', time: '15:00', location: 'Seine River', type: 'attraction' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'New York City',
    destination: 'New York, USA',
    startDate: '2023-12-10',
    endDate: '2023-12-15',
    status: 'past',
    description: 'Winter holiday in the Big Apple',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    days: []
  },
  {
    id: '4',
    name: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    startDate: '2024-06-10',
    endDate: '2024-06-20',
    status: 'upcoming',
    description: 'Tropical paradise and cultural immersion',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    days: []
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleContinueWithoutLogin = () => {
    setIsAuthenticated(true);
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
  };

  const addTrip = (newTrip: Trip) => {
    setTrips([...trips, newTrip]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginSignup 
                  onLogin={handleLogin}
                  onContinueWithoutLogin={handleContinueWithoutLogin}
                />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard 
                  trips={trips} 
                  onAddTrip={addTrip}
                  isAuthenticated={isAuthenticated}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/trip/:id" 
            element={
              isAuthenticated ? (
                <TripManagement 
                  trips={trips}
                  onUpdateTrip={updateTrip}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
