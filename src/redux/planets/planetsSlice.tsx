import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet, PlanetsState } from './types';
import * as api from '../../utils/api';
import store from '../store';

export const fetchPlanets = createAsyncThunk('planets/fetchPlanets', async () => {
  const response = await api.fetchPlanets();
  return response.bodies as Planet[];
});

const initialState: PlanetsState = {
  loading: false,
  planets: [],
  error: '',
  refresh: false,
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    showPlanet: (state, action: PayloadAction<string>) => {
      const newPlanet = state.planets.map((planet) => {
        if (planet.id !== action.payload) return planet;
        return { ...planet, details: true };
      });
      return {
        ...state,
        planets: newPlanet,
      };
    },
    removePlanet: (state, action: PayloadAction<string>) => {
      const newPlanet = state.planets.map((planet) => {
        if (planet.id !== action.payload) return planet;
        return { ...planet, details: false };
      });
      return {
        ...state,
        planets: newPlanet,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.planets = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlanets.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { showPlanet, removePlanet } = planetsSlice.actions;

export default planetsSlice.reducer;

export type AppDispatch = typeof store.dispatch;
