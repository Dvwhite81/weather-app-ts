import { FC, useEffect, useState } from 'react';
import { WeatherLocation } from '../models/Weather';
import { Weather } from '../models/Weather';
import { readForecast, readWeather } from '../services/WeatherService';
import { LocationEntry } from './LocationEntry';
import './WeatherSummary.scss';

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id),
          readForecast(location.id)
        ]);
        setWeather(weather);
        setForecast(forecast);
      }
    })();
  }, [location]);

  if (!location || !weather || !forecast) return null;

  return (
    <div>
      <hr />
      <h2>{location.name}</h2>
      <LocationEntry weather={weather} />
      <br />
      <h2>Forecast</h2>
      <div>
        <ol>
          {forecast.map((time) => {
            return (
              <li key={time.dt}>
                <LocationEntry weather={time} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  );
}
