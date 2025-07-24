import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface TravelPlace {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: Array<{
    url: string;
    filename: string;
  }>;
  author: {
    _id: string;
    username: string;
  };
  reviews: Array<any>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface TravelPlaceState {
  travelPlaces: TravelPlace[];
  currentTravelPlace: TravelPlace | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TravelPlaceState = {
  travelPlaces: [],
  currentTravelPlace: null,
  isLoading: false,
  error: null,
};

// Helper function to get auth headers
const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Async thunks
export const fetchTravelPlaces = createAsyncThunk(
  'travelPlaces/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/travelplaces`);
    return response.data.travelplaces;
  }
);

export const fetchTravelPlace = createAsyncThunk(
  'travelPlaces/fetchOne',
  async (id: string) => {
    const response = await axios.get(`${API_URL}/travelplaces/${id}`);
    return response.data.travelplace;
  }
);

export const createTravelPlace = createAsyncThunk(
  'travelPlaces/create',
  async ({ travelPlaceData, token }: { travelPlaceData: FormData; token: string }) => {
    const response = await axios.post(
      `${API_URL}/travelplaces`,
      travelPlaceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.travelplace;
  }
);

export const updateTravelPlace = createAsyncThunk(
  'travelPlaces/update',
  async ({ id, travelPlaceData, token }: { id: string; travelPlaceData: FormData; token: string }) => {
    const response = await axios.put(
      `${API_URL}/travelplaces/${id}`,
      travelPlaceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.travelplace;
  }
);

export const deleteTravelPlace = createAsyncThunk(
  'travelPlaces/delete',
  async ({ id, token }: { id: string; token: string }) => {
    await axios.delete(`${API_URL}/travelplaces/${id}`, getAuthHeaders(token));
    return id;
  }
);

const travelPlaceSlice = createSlice({
  name: 'travelPlaces',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTravelPlace: (state) => {
      state.currentTravelPlace = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all travel places
      .addCase(fetchTravelPlaces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTravelPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelPlaces = action.payload;
      })
      .addCase(fetchTravelPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch travel places';
      })
      // Fetch single travel place
      .addCase(fetchTravelPlace.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTravelPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTravelPlace = action.payload;
      })
      .addCase(fetchTravelPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch travel place';
      })
      // Create travel place
      .addCase(createTravelPlace.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTravelPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelPlaces.push(action.payload);
      })
      .addCase(createTravelPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create travel place';
      })
      // Update travel place
      .addCase(updateTravelPlace.fulfilled, (state, action) => {
        const index = state.travelPlaces.findIndex(tp => tp._id === action.payload._id);
        if (index !== -1) {
          state.travelPlaces[index] = action.payload;
        }
        state.currentTravelPlace = action.payload;
      })
      // Delete travel place
      .addCase(deleteTravelPlace.fulfilled, (state, action) => {
        state.travelPlaces = state.travelPlaces.filter(tp => tp._id !== action.payload);
        if (state.currentTravelPlace?._id === action.payload) {
          state.currentTravelPlace = null;
        }
      });
  },
});

export const { clearError, clearCurrentTravelPlace } = travelPlaceSlice.actions;
export default travelPlaceSlice.reducer; 