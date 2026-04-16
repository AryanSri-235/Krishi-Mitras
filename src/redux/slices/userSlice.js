import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  location: {
    latitude: null,
    longitude: null,
    city: null,
  },
  locationError: null, // New state to handle errors
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: () => {
      // Reset to initial state on logout
      return initialState;
    },
    setLocation: (state, action) => {
      state.location = { ...state.location, ...action.payload };
      state.locationError = null; // Clear any previous errors on success
    },
    setLocationError: (state, action) => { // New action for errors
      state.locationError = action.payload;
    },
  },
});

export const { setUser, clearUser, setLocation, setLocationError } = userSlice.actions;

export default userSlice.reducer;