import { GeoCoord } from "./fetchGeoCoord.js";
import fetch from "../include/fetch.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  const searchURL = new URL("https://api.open-meteo.com/v1/forecast");
  searchURL.searchParams.set("latitude", coords.lat.toString());
  searchURL.searchParams.set("longitude", coords.lon.toString());
  searchURL.searchParams.set("hourly", "temperature_2m");
  searchURL.searchParams.set("temperature_unit", "fahrenheit");

  return fetch(searchURL.toString())
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
      }
      return response.json();
    })
    .then(json => {
      if (json.hourly !== undefined && json.hourly.time !== undefined && json.hourly.temperature_2m !== undefined) {
        return Promise.resolve({ time: json.hourly.time, temperature_2m: json.hourly.temperature_2m });
      } else {
        return Promise.reject(new Error("No results found for query"));
      }
    });
  }