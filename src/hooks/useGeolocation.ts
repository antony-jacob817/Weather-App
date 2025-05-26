import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  position: {
    lat: number;
    lon: number;
  } | null;
}

const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    position: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: 'Geolocation is not supported by your browser',
        position: null,
      });
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        position: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
    };

    const geoError = (error: GeolocationPositionError) => {
      setState({
        loading: false,
        error: error.message,
        position: null,
      });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
  }, []);

  return state;
};

export default useGeolocation;