import { useState } from 'react';
import './App.css';
import { LocationSearch } from './LocationSearch';
import { LocationsTable } from './LocationsTable';
import { WeatherLocation } from '../models/Weather';
import { ErrorAlert, WarningAlert } from './Alerts';
import { searchLocation } from '../services/WeatherService';
import { WeatherSummary } from './WeatherSummary';

function App() {
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const resetAlerts = () => {
    setError('');
    setWarning('');
  }

  const addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found named '${term}'`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location '${term}' is already in locations list`);
    } else {
      setLocations([...locations, location]);
    }
  }

  return (
    <div className='container'>
      <LocationSearch onSearch={addLocation} />
      <ErrorAlert message={error} />
      <WarningAlert message={warning} />
      <LocationsTable
        locations={locations}
        current={currentLocation}
        onSelect={location => setCurrentLocation(location)}
      />
      <WeatherSummary location={currentLocation} />
    </div>
  );
}

export default App;
