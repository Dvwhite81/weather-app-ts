import { FC, useState } from 'react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const disableSearch = search.trim() === '';

  const addLocation = () => {
    onSearch(search);
    setSearch('');
  };

  return (
    <div>
      <div id="location-search">
        <form onSubmit={addLocation}>
          <label>
            Add Location:
            <input
              className="ml-1 mx-2 my-2"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </label>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={addLocation}
            disabled={disableSearch}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
