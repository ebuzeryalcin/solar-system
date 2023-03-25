import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchPlanets } from './redux/planets/planetsSlice';
import Main from './components/Main';
import { RootState, AppDispatch } from './redux/store';

const App = () => {
  const refresh = useSelector((state: RootState) => state.planets);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlanets());
  }, [dispatch, refresh.refresh]);

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
