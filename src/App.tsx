import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { WeatherProvider } from './context/WeatherContext';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <HelmetProvider>
      <WeatherProvider>
        <WeatherPage />
      </WeatherProvider>
    </HelmetProvider>
    
  );
}

export default App;