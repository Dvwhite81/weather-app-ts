import { FC } from 'react';
import { Weather } from '../models/Weather';
import { getIconUrl } from '../services/WeatherService';

interface LocationEntryProps {
  weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const LocationEntry: FC<LocationEntryProps> = ({ weather }) => {
  return (
    <div>
      <div>
        {convertUnixTimeToDate(weather.dt).toLocaleTimeString()}
      </div>
      <div>
        <strong>
          {weather.main.temp}°F
        </strong>
        <div>
          ({weather.main.temp_min}°F / {weather.main.temp_max}°F)
        </div>
      </div>
      <div>
        Humidity: {weather.main.humidity}%
      </div>
      {weather.weather.map((condition) => {
        return (
          <div key={condition.id}>
            <img src={getIconUrl(condition.icon)} alt={condition.main} />
            {condition.main} {condition.description}
          </div>
        )
      })}
    </div>
  )
}
