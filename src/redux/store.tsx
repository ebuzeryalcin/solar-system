import { configureStore, ThunkAction, Action, Reducer, AnyAction } from '@reduxjs/toolkit';
import planetsSlice from './planets/planetsSlice';
import { PlanetsState } from './planets/types';

const store = configureStore({
  reducer: {
    planets: planetsSlice as Reducer<PlanetsState, AnyAction>,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
