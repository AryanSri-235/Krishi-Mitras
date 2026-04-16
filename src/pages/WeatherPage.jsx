"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherForecast } from "../redux/slices/weatherSlice"; // path adjust

// Weather Card Component
const WeatherCard = ({ day, index }) => {
  const date = new Date(day.dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const getFieldCondition = (humidity, windSpeed, precipitation) => {
    if (precipitation > 0.6)
      return {
        text: "No Field Work",
        color: "text-red-700",
        bg: "bg-red-100",
        border: "border-red-300",
      };
    if (precipitation > 0.3)
      return {
        text: "Limited Work",
        color: "text-yellow-700",
        bg: "bg-yellow-100",
        border: "border-yellow-300",
      };
    if (humidity > 70)
      return {
        text: "Monitor Conditions",
        color: "text-blue-700",
        bg: "bg-blue-100",
        border: "border-blue-300",
      };
    return {
      text: "Good for Field Work",
      color: "text-green-700",
      bg: "bg-green-100",
      border: "border-green-300",
    };
  };

  const fieldCondition = getFieldCondition(
    day.main.humidity,
    day.wind.speed,
    day.pop
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-72 flex-shrink-0"
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-green-800">{dayName}</h3>
        <p className="text-sm text-green-600 mb-2">{monthDay}</p>
        <img
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt={day.weather[0].description}
          className="w-20 h-20 mx-auto"
        />
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-extrabold text-amber-600">
          {Math.round(day.main.temp)}°C
        </div>
        <div className="text-sm text-gray-600">
          {Math.round(day.main.temp_min)}° - {Math.round(day.main.temp_max)}°
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between bg-green-50 p-2 rounded-lg">
          <span>💧 Humidity</span>
          <span>{day.main.humidity}%</span>
        </div>
        <div className="flex justify-between bg-blue-50 p-2 rounded-lg">
          <span>🌧 Rain</span>
          <span>{Math.round(day.pop * 100)}%</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
          <span>🌬 Wind</span>
          <span>{day.wind.speed} m/s</span>
        </div>
      </div>

      <div className="text-center mb-3">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
          {day.weather[0].description}
        </span>
      </div>

      <div
        className={`${fieldCondition.bg} ${fieldCondition.color} p-2 rounded-lg text-center text-sm border ${fieldCondition.border}`}
      >
        🚜 {fieldCondition.text}
      </div>
    </motion.div>
  );
};

// Main Page
const WeatherPage = () => {
  const dispatch = useDispatch();
  const { forecast, status, error } = useSelector(
    (state) => state.weather
  );

  const [city] = useState("Jalandhar");

  useEffect(() => {
    dispatch(fetchWeatherForecast({ lat: 31.3260, lon: 75.5762 }));
  }, [dispatch]);

  if (status === "loading") {
    return <h2 className="text-center mt-10">Loading... 🌦</h2>;
  }

  if (status === "failed") {
    return (
      <h2 className="text-center mt-10 text-red-500">
        Error: {error}
      </h2>
    );
  }

  return (
    <div className="bg-blue-200 min-h-screen w-full">
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-green-900">
          🌾 Farm Weather Forecast
        </h1>
        <p className="text-xl text-green-700">{city}</p>
      </div>

      <div className="px-6">
        <div className="flex gap-6 overflow-x-auto pb-6">
          {forecast.map((day, index) => (
            <WeatherCard key={day.dt} day={day} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;