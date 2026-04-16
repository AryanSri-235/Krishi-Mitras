import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch 5-day/3-hour weather data
export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchForecast',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey) throw new Error("API key missing");

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);

      const dailyForecasts = {};

      response.data.list.forEach(item => {
        const [date, time] = item.dt_txt.split(' ');

        if (!dailyForecasts[date] || time === "12:00:00") {
          dailyForecasts[date] = item;
        }
      });

      return Object.values(dailyForecasts).slice(0, 5);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);

// ... (the rest of the slice remains the same)
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    forecast: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;