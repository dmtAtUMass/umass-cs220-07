import { GeoCoord } from "./fetchGeoCoord.js";
import fetch from "../include/fetch.js";
import { makeSearchURL } from "./utility.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}
export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  const queries = [["latitude", coords.lat.toString()], ["longitude", coords.lon.toString()], ["hourly", "temperature_2m"], ["temperature_unit", "fahrenheit"]];
  const searchURL = makeSearchURL("https://220.maxkuechen.com/currentTemperature/forecast", queries);
  return fetch(searchURL)
    .then(response => {
      return response.ok ? response.json() : Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
    })
    .then((json : {hourly : TemperatureReading}) => {
      // if (json.hourly) { // I think we don't need the check here because if the geolocation does not exist the error is caught in the step above
      return Promise.resolve({ time: json.hourly.time, temperature_2m: json.hourly.temperature_2m });
      // } else {
      //   return Promise.reject(new Error("No results found for query"));
      // }
    });
}
