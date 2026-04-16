import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import './index.css';

// Firebase + Redux
import { auth } from './services/firebase';
import { setUser, clearUser, setLocation, setLocationError } from './redux/slices/userSlice';

// Components & Pages
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import TrainingPage from './pages/TrainingPage';
import WeatherPage from './pages/WeatherPage';
import MandiPricesPage from './pages/MandiPricesPage';
import ProfilePage from './pages/ProfilePage';
import ChatbotWidget from './components/ui/ChatbotWidget';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuthLoading, setAuthLoading] = useState(true);

  const { isAuthenticated, location } = useSelector(state => state.user);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })); // ✅ Redirect to dashboard after login
      } else {
        dispatch(clearUser());
        navigate('/login');
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Fetch user location (reverse geocoding)
  useEffect(() => {
    if (isAuthenticated && !location.latitude) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
            const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
            const response = await axios.get(url);
            const city = response.data[0]?.name || 'Unknown Location';
            dispatch(setLocation({ latitude, longitude, city }));
          } catch (error) {
            console.error("Error fetching city name:", error);
            dispatch(setLocation({ latitude, longitude, city: 'Could not fetch city' }));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          dispatch(setLocationError("Location access was denied."));
        }
      );
    }
  }, [isAuthenticated, location.latitude, dispatch]);

  // Loading screen while Firebase checks session
  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100">
        <p className="text-lg font-medium text-green-800">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <SignInPage />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/weather" element={<WeatherPage/>} />
            <Route path="/mandi-prices" element={<MandiPricesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
      <ChatbotWidget />
    </div>
  );
}

export default App;

