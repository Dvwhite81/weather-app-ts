import { FC } from 'react';
import { WeatherLocation } from '../models/Weather';

interface LocationsTableProps {
  locations: WeatherLocation[];
  current: WeatherLocation | null;
  onSelect: (location: WeatherLocation) => void;
}

export const LocationsTable: FC<LocationsTableProps> = ({ locations, current, onSelect }) => {
  return (
    <div id='locations'>
        <h2>Locations</h2>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) =>
              <tr
                key={index}
                className={current?.id === location.id ? 'table-primary' : ''}
                onClick={() => onSelect(location)}
              >
                <td>
                  {location.name}
                </td>
              </tr>
              )}
          </tbody>
        </table>
      </div>
  )
}
