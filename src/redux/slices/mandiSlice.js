import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// MOCK API: Replace this with your actual API call
const fetchMandiPricesFromAPI = async (city) => {
  console.log(`Fetching mandi prices for ${city}...`);
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return mock data
  return [
    
  {
    crop: "Wheat",
    trend: "up",
    history: [
      { date: "2025-09-30", price: 2540 },
      { date: "2025-10-01", price: 2560 },
      { date: "2025-10-02", price: 2585 },
      { date: "2025-10-03", price: 2600 },
      { date: "2025-10-04", price: 2620 },
      { date: "2025-10-05", price: 2635 },
      { date: "2025-10-06", price: 2650 },
    ],
  },
  {
    crop: "Rice",
    trend: "down",
    history: [
      { date: "2025-09-30", price: 2800 },
      { date: "2025-10-01", price: 2790 },
      { date: "2025-10-02", price: 2780 },
      { date: "2025-10-03", price: 2770 },
      { date: "2025-10-04", price: 2760 },
      { date: "2025-10-05", price: 2745 },
      { date: "2025-10-06", price: 2730 },
    ],
  },
  {
    crop: "Maize",
    trend: "up",
    history: [
      { date: "2025-09-30", price: 2300 },
      { date: "2025-10-01", price: 2315 },
      { date: "2025-10-02", price: 2330 },
      { date: "2025-10-03", price: 2320 },
      { date: "2025-10-04", price: 2345 },
      { date: "2025-10-05", price: 2360 },
      { date: "2025-10-06", price: 2380 },
    ],
  },
  {
    crop: "Bajra",
    trend: "stable",
    history: [
      { date: "2025-09-30", price: 2100 },
      { date: "2025-10-01", price: 2105 },
      { date: "2025-10-02", price: 2100 },
      { date: "2025-10-03", price: 2108 },
      { date: "2025-10-04", price: 2110 },
      { date: "2025-10-05", price: 2112 },
      { date: "2025-10-06", price: 2110 },
    ],
  },
  {
    crop: "Sugarcane",
    trend: "up",
    history: [
      { date: "2025-09-30", price: 330 },
      { date: "2025-10-01", price: 332 },
      { date: "2025-10-02", price: 333 },
      { date: "2025-10-03", price: 335 },
      { date: "2025-10-04", price: 336 },
      { date: "2025-10-05", price: 338 },
      { date: "2025-10-06", price: 340 },
    ],
  },
  ];
}

export const fetchMandiPrices = createAsyncThunk(
  'mandi/fetchPrices',
  async (city, { rejectWithValue }) => {
    try {
      const prices = await fetchMandiPricesFromAPI(city);
      return prices;
    } catch  {
      return rejectWithValue('Failed to fetch Mandi prices.');
    }
  }
);

const mandiSlice = createSlice({
  name: 'mandi',
  initialState: {
    prices: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMandiPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMandiPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prices = action.payload;
      })
      .addCase(fetchMandiPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default mandiSlice.reducer;