import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// pages
import Home from './pages/Home';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <RouterProvider router={router} />
    </WorkoutsContextProvider>
  </React.StrictMode>
);