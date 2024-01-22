import { Weather, WeatherLocation } from "../models/Weather";

const key: string = import.meta.env.VITE_WEATHER_API_KEY as string;

if (key === undefined) {
  throw new Error('No API key defined');
}

const keyQuery = `appid=${key}`;
const server = 'http://api.openweathermap.org/data/2.5';

export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const result = await fetch(`${server}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return await result.json();
}

export async function readWeather(locationId: number): Promise<Weather> {
  const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=imperial`);

  if (current.status !== 200) throw new Error('Failed to read location data');

  return await current.json();
}

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

export async function readForecast(locationId: number): Promise<Weather[]> {
  const forecast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=imperial&cnt=8`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
}
