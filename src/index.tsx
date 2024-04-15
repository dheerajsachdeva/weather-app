import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './components/Home';
import CityTable from './components/CityTable';
import WeatherPage from './components/Weather';

const HomeRoute = ()=>{
  return (
    <>
      <Home />
      <CityTable />
    </>
  );
}


const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children : [
    {
      path: "/",
      element: <HomeRoute/>
    },
{
  path: '/cityDetails/:city',
  element: <WeatherPage />
},
  ]
},])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

